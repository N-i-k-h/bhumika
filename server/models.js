import mongoose from 'mongoose';

// Product Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String }, // Optional/legacy field
  image: { type: String, required: true }, // Base64 or URL
  material: { type: String, required: true },
  weight: { type: String, required: true },
  dimensions: { type: String, required: true },
  description: { type: String, required: true },
  applications: { type: String, required: true },
  industry: { type: String, enum: ['automobile', 'food', 'textile', 'reverse_osmosis', 'others'], default: 'others', required: true }
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
  scope: { type: String, required: true },
  refNumber: { type: String, required: true },
  validity: { type: String, required: true },
  image: { type: String } // Optional base64 or URL
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
export const Customer = mongoose.model('Customer', customerSchema);
export const Certificate = mongoose.model('Certificate', certificateSchema);
