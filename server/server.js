import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import { Product, Customer, Certificate } from './models.js';
import { seedDatabase } from './seed.js';

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

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://nikhilkashyapkn_db_user:bhumika@cluster0.pblbglz.mongodb.net/?appName=Cluster0";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

// Middlewares
app.use(cors());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(distPath));

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
    const { title, category, image, material, weight, dimensions, description, applications } = req.body;
    const imageUrl = await uploadToCloudinary(image);
    const id = Date.now(); // Unique number ID
    const newProduct = new Product({
      id,
      title,
      category,
      image: imageUrl,
      material,
      weight,
      dimensions,
      description,
      applications
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
    const { title, category, image, material, weight, dimensions, description, applications } = req.body;
    const updateData = { title, category, material, weight, dimensions, description, applications };
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
    const { title, authority, scope, refNumber, validity, image } = req.body;
    const imageUrl = image ? await uploadToCloudinary(image) : undefined;
    const newCertificate = new Certificate({ title, authority, scope, refNumber, validity, image: imageUrl });
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
    const { title, authority, scope, refNumber, validity, image } = req.body;
    const updateData = { title, authority, scope, refNumber, validity };
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

// Re-seed route
app.post('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    await Customer.deleteMany({});
    await Certificate.deleteMany({});
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
