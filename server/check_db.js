import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product, Customer, Certificate } from './models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
const URI = process.env.MONGO_URI || "mongodb+srv://nikhilkashyapkn_db_user:bhumika@cluster0.pblbglz.mongodb.net/?appName=Cluster0";

console.log("Connecting to:", URI);

mongoose.connect(URI)
  .then(async () => {
    console.log("Connected successfully.");
    const productsCount = await Product.countDocuments();
    const customersCount = await Customer.countDocuments();
    const certsCount = await Certificate.countDocuments();
    console.log("Products count:", productsCount);
    console.log("Customers count:", customersCount);
    console.log("Certificates count:", certsCount);
    
    if (productsCount > 0) {
      const allProds = await Product.find({}, { title: 1, id: 1 });
      console.log("Sample products:", allProds);
    }
    
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
