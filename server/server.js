import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import { Product, Customer, Certificate, Job, Category, EmailDraft } from './models.js';
import { seedDatabase } from './seed.js';
import { getTransporter, createGmailDraft } from './transporter.js';
import nodemailer from 'nodemailer';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadToCloudinary(imageStr) {
  if (!imageStr) return '';
  if (!imageStr.startsWith('data:image')) {
    return imageStr; // Already a URL
  }
  try {
    const result = await cloudinary.uploader.upload(imageStr, {
      folder: 'bhumika_alloy_castings'
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

async function uploadFileToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'bhumika_alloy_castings_attachments',
      resource_type: 'raw'
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary file upload error:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
}


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://nikhilkashyapkn_db_user:bhumika@cluster0.pblbglz.mongodb.net/?appName=Cluster0";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

// --- Multer & File Upload Configuration ---
const uploadDir = path.join(__dirname, 'uploads/email-drafts');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${crypto.randomUUID()}${ext}`;
    cb(null, uniqueName);
  }
});

const CAREERS_ALLOWED = {
  '.pdf': ['application/pdf'],
  '.doc': ['application/msword'],
  '.docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  '.jpg': ['image/jpeg', 'image/jpg'],
  '.jpeg': ['image/jpeg', 'image/jpg'],
  '.png': ['image/png']
};

const RFQ_ALLOWED = {
  '.pdf': ['application/pdf'],
  '.dwg': ['image/vnd.dwg', 'image/x-dwg', 'application/acad', 'application/x-acad', 'application/autocad_dwg', 'application/dwg', 'application/x-dwg', 'application/octet-stream'],
  '.dxf': ['image/vnd.dxf', 'image/x-dxf', 'application/dxf', 'application/x-dxf', 'application/autocad_dxf', 'application/octet-stream'],
  '.step': ['application/step', 'application/stp', 'text/plain', 'application/x-step', 'application/x-stp', 'application/octet-stream'],
  '.stp': ['application/step', 'application/stp', 'text/plain', 'application/x-step', 'application/x-stp', 'application/octet-stream'],
  '.iges': ['application/iges', 'application/igs', 'model/iges', 'application/x-iges', 'application/x-igs', 'application/octet-stream'],
  '.igs': ['application/iges', 'application/igs', 'model/iges', 'application/x-iges', 'application/x-igs', 'application/octet-stream']
};

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype.toLowerCase();

  const isCareersAllowed = CAREERS_ALLOWED[ext] && (CAREERS_ALLOWED[ext].includes(mime) || mime === 'application/octet-stream');
  const isRfqAllowed = RFQ_ALLOWED[ext] && (RFQ_ALLOWED[ext].includes(mime) || mime === 'application/octet-stream');

  if (isCareersAllowed || isRfqAllowed) {
    cb(null, true);
  } else {
    cb(new Error(`File type not allowed: ${ext}`), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file limit
  }
});

const cleanupUploadedFiles = (files) => {
  if (!files || !Array.isArray(files)) return;
  files.forEach(file => {
    const filePath = file.path;
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`Successfully cleaned up file: ${filePath}`);
      } catch (err) {
        console.error(`Error deleting file ${filePath}:`, err);
      }
    }
  });
};

// --- Background Cleanup Cron for Expired Drafts ---
const CLEANUP_INTERVAL = 60 * 60 * 1000; // hourly
setInterval(async () => {
  console.log("[Background Job] Starting cleanup of expired drafts...");
  try {
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    const expiredDrafts = await EmailDraft.find({
      status: 'draft',
      createdAt: { $lt: cutoffTime }
    });

    if (expiredDrafts.length > 0) {
      console.log(`[Background Job] Found ${expiredDrafts.length} expired drafts to delete.`);
      for (const draft of expiredDrafts) {
        cleanupUploadedFiles(draft.attachments);
        await EmailDraft.findByIdAndDelete(draft._id);
      }
      console.log("[Background Job] Expired drafts cleanup complete.");
    } else {
      console.log("[Background Job] No expired drafts found.");
    }
  } catch (err) {
    console.error("[Background Job] Error during draft cleanup:", err);
  }
}, CLEANUP_INTERVAL);

// Middlewares
app.use(cors());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(distPath));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    autoSeed();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// --- API Endpoints ---

// 1. Products CRUD
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    products.sort((a, b) => b.id - a.id);
    res.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { title, category, image, material, metalGrade, weight, dimensions, description, applications, industry } = req.body;
    const imageUrl = await uploadToCloudinary(image);
    const id = Date.now(); // Unique number ID
    const newProduct = new Product({
      id,
      title,
      category,
      image: imageUrl,
      material,
      metalGrade,
      weight,
      dimensions,
      description,
      applications,
      industry: industry || 'others'
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const result = await Product.findOneAndDelete({ id: Number(req.params.id) });
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { title, category, image, material, metalGrade, weight, dimensions, description, applications, industry } = req.body;
    const updateData = { title, category, material, metalGrade, weight, dimensions, description, applications, industry };
    if (image) {
      updateData.image = await uploadToCloudinary(image);
    }
    const updated = await Product.findOneAndUpdate(
      { id: Number(req.params.id) },
      updateData,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Customers CRUD
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    customers.sort((a, b) => b.createdAt - a.createdAt);
    res.json(customers);
  } catch (error) {
    console.error("GET /api/customers error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/customers', async (req, res) => {
  try {
    const { company, logo, quote } = req.body;
    const logoUrl = await uploadToCloudinary(logo);
    const newCustomer = new Customer({ company, logo: logoUrl, quote });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    const result = await Customer.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/customers/:id', async (req, res) => {
  try {
    const { company, logo, quote } = req.body;
    const updateData = { company, quote };
    if (logo) {
      updateData.logo = await uploadToCloudinary(logo);
    }
    const updated = await Customer.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: "Customer not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. Certificates CRUD
app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.find();
    certificates.sort((a, b) => b.createdAt - a.createdAt);
    res.json(certificates);
  } catch (error) {
    console.error("GET /api/certificates error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/certificates', async (req, res) => {
  try {
    const { title, authority, refNumber, validity, image } = req.body;
    const imageUrl = image ? await uploadToCloudinary(image) : undefined;
    const newCertificate = new Certificate({ title, authority, refNumber, validity, image: imageUrl });
    await newCertificate.save();
    res.status(201).json(newCertificate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/certificates/:id', async (req, res) => {
  try {
    const result = await Certificate.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "Certificate not found" });
    res.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/certificates/:id', async (req, res) => {
  try {
    const { title, authority, refNumber, validity, image } = req.body;
    const updateData = { title, authority, refNumber, validity };
    if (image) {
      updateData.image = await uploadToCloudinary(image);
    }
    const updated = await Certificate.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: "Certificate not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Jobs CRUD
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("GET /api/jobs error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const { jobId, title, department, location, shift, type, description, requirements, vacancy } = req.body;
    const newJob = new Job({ jobId, title, department, location, shift, type, description, requirements, vacancy });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const result = await Job.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "Job posting not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/jobs/:id', async (req, res) => {
  try {
    const { jobId, title, department, location, shift, type, description, requirements, vacancy } = req.body;
    const updated = await Job.findByIdAndUpdate(
      req.params.id,
      { jobId, title, department, location, shift, type, description, requirements, vacancy },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Job posting not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Category CRUD
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    console.error("GET /api/categories error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Category name is required" });
    }
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9\s_-]/g, '').replace(/[\s-]+/g, '_');
    const existing = await Category.findOne({ $or: [{ name }, { slug }] });
    if (existing) {
      return res.status(400).json({ error: "Category already exists" });
    }
    const newCategory = new Category({ name, slug });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Category name is required" });
    }
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const newSlug = name.toLowerCase().trim().replace(/[^a-z0-9\s_-]/g, '').replace(/[\s-]+/g, '_');
    
    const conflict = await Category.findOne({
      _id: { $ne: req.params.id },
      $or: [{ name }, { slug: newSlug }]
    });
    if (conflict) {
      return res.status(400).json({ error: "Another category with this name or slug already exists" });
    }
    
    const oldSlug = category.slug;
    category.name = name;
    category.slug = newSlug;
    await category.save();
    
    if (oldSlug !== newSlug) {
      await Product.updateMany({ industry: oldSlug }, { industry: newSlug });
    }
    
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const oldSlug = category.slug;
    await Category.findByIdAndDelete(req.params.id);
    
    if (oldSlug !== 'others') {
      await Product.updateMany({ industry: oldSlug }, { industry: 'others' });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Email Draft Endpoints ---

// 1. Create a draft with attachments
app.post('/api/email/draft', (req, res) => {
  upload.any()(req, res, async (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(400).json({ success: false, message: err.message });
    }

    try {
      const { to, subject, body, senderEmail } = req.body;

      if (!to || !to.trim()) {
        cleanupUploadedFiles(req.files);
        return res.status(400).json({ success: false, message: "Recipient email is required" });
      }
      if (!senderEmail || !senderEmail.trim()) {
        cleanupUploadedFiles(req.files);
        return res.status(400).json({ success: false, message: "Sender email is required" });
      }
      if (!subject || !subject.trim()) {
        cleanupUploadedFiles(req.files);
        return res.status(400).json({ success: false, message: "Subject is required" });
      }
      if (!body || !body.trim()) {
        cleanupUploadedFiles(req.files);
        return res.status(400).json({ success: false, message: "Email body is required" });
      }

      const files = req.files || [];
      const totalSize = files.reduce((sum, f) => sum + f.size, 0);
      if (totalSize > 30 * 1024 * 1024) {
        cleanupUploadedFiles(files);
        return res.status(400).json({ success: false, message: "Total attachments size exceeds 30MB limit" });
      }

      // Upload files to Cloudinary (with fallback to local storage on error)
      const attachments = [];
      for (const file of files) {
        let downloadUrl = "";
        let uploadSuccess = false;

        try {
          console.log(`Attempting to upload attachment to Cloudinary: ${file.originalname}`);
          downloadUrl = await uploadFileToCloudinary(file.path);
          uploadSuccess = true;
          // Delete local file immediately since it's hosted in the cloud
          fs.unlink(file.path, (unlinkErr) => {
            if (unlinkErr) console.warn("Could not delete local file after Cloudinary upload:", file.path);
          });
        } catch (uploadErr) {
          console.warn(`[Cloudinary Warning] Upload failed for ${file.originalname}. Falling back to local server storage...`, uploadErr.message);
          const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
          downloadUrl = `${baseUrl}/uploads/email-drafts/${file.filename}`;
          uploadSuccess = false;
        }

        attachments.push({
          filename: file.originalname,
          path: uploadSuccess ? downloadUrl : file.path,
          mimetype: file.mimetype,
          size: file.size,
          downloadUrl
        });
      }

      // Append download links to the email message body
      let finalBody = body.trim();
      if (attachments.length > 0) {
        finalBody += "\n\n" +
          attachments.map(att => `${att.filename}: ${att.downloadUrl}`).join("\n");
      }

      const draftId = crypto.randomUUID();
      const draft = new EmailDraft({
        _id: draftId,
        senderEmail: senderEmail.trim(),
        recipient: to.trim(),
        subject: subject.trim(),
        body: finalBody,
        attachments,
        status: 'draft'
      });

      await draft.save();
      res.status(201).json({ success: true, draftId });
    } catch (dbErr) {
      console.error("Draft creation error:", dbErr);
      cleanupUploadedFiles(req.files);
      res.status(500).json({ success: false, message: "Failed to create draft in database" });
    }
  });
});

// 2. Fetch a draft details
app.get('/api/email/draft/:id', async (req, res) => {
  try {
    const draft = await EmailDraft.findById(req.params.id);
    if (!draft) {
      return res.status(404).json({ success: false, message: "Draft not found" });
    }
    res.json({
      success: true,
      draft: {
        id: draft._id,
        senderEmail: draft.senderEmail,
        recipient: draft.recipient,
        subject: draft.subject,
        body: draft.body,
        attachments: draft.attachments.map(att => ({
          filename: att.filename,
          size: att.size,
          mimetype: att.mimetype,
          downloadUrl: att.downloadUrl
        })),
        status: draft.status
      }
    });
  } catch (err) {
    console.error("GET draft error:", err);
    res.status(500).json({ success: false, message: "Server error fetching draft" });
  }
});

// 3. Edit a draft (fails if sent)
app.put('/api/email/draft/:id', async (req, res) => {
  try {
    const { to, subject, body } = req.body;

    if (!to || !to.trim() || !subject || !subject.trim() || !body || !body.trim()) {
      return res.status(400).json({ success: false, message: "Fields to, subject, and body are required" });
    }

    const draft = await EmailDraft.findById(req.params.id);
    if (!draft) {
      return res.status(404).json({ success: false, message: "Draft not found" });
    }

    if (draft.status === "sent") {
      return res.status(400).json({ success: false, message: "Sent drafts cannot be edited" });
    }

    draft.recipient = to.trim();
    draft.subject = subject.trim();
    draft.body = body.trim();
    await draft.save();

    res.json({ success: true, message: "Draft updated successfully" });
  } catch (err) {
    console.error("PUT draft error:", err);
    res.status(500).json({ success: false, message: "Server error updating draft" });
  }
});

// 4. Mark draft as sent in database
app.post('/api/email/draft/:id/send', async (req, res) => {
  try {
    const draft = await EmailDraft.findById(req.params.id);
    if (!draft) {
      return res.status(404).json({ success: false, message: "Draft not found" });
    }

    draft.status = 'sent';
    await draft.save();

    res.json({
      success: true,
      message: "Draft marked as sent successfully"
    });
  } catch (err) {
    console.error("Send draft error:", err);
    res.status(500).json({ success: false, message: "Server error during draft marking" });
  }
});

// Re-seed route
app.post('/api/seed', async (req, res) => {
  try {
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Customer.deleteMany({});
    await Certificate.deleteMany({});
    await Job.deleteMany({});
    await autoSeed(true);
    res.json({ message: "Database re-seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auto Seed Function
async function autoSeed(force = false) {
  await seedDatabase(force);
}

// Serve SPA index.html for all other non-API routes in production
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not Found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
