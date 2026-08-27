import mongoose from 'mongoose';

// Product Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String }, // Optional/legacy field
  image: { type: String, required: true }, // Base64 or URL
  material: { type: String },
  metalGrade: { type: String },
  weight: { type: String },
  dimensions: { type: String },
  description: { type: String },
  applications: { type: String },
  industry: { type: String, default: 'others', required: true }
}, { timestamps: true });

// Customer Schema
const customerSchema = new mongoose.Schema({
  company: { type: String, required: true },
  logo: { type: String, required: true }, // Base64 or URL
  quote: { type: String, required: true }
}, { timestamps: true });

// Certificate Schema
const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authority: { type: String, required: true },
  refNumber: { type: String, required: true },
  validity: { type: String, required: true },
  image: { type: String } // Optional base64 or URL
}, { timestamps: true });

// Job Posting Schema
const jobSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  shift: { type: String, default: '1st' },
  type: { type: String, default: 'FULL-TIME' },
  description: { type: String },
  requirements: { type: String },
  vacancy: { type: String, default: '1 Position' }
}, { timestamps: true });

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
export const Customer = mongoose.model('Customer', customerSchema);
export const Certificate = mongoose.model('Certificate', certificateSchema);
export const Job = mongoose.model('Job', jobSchema);
export const Category = mongoose.model('Category', categorySchema);

