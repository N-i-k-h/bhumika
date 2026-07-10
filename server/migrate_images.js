import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { Product, Customer, Certificate } from './models.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const MONGO_URI = process.env.MONGO_URI;

async function uploadToCloudinary(base64Str, folder) {
  try {
    const result = await cloudinary.uploader.upload(base64Str, {
      folder: `bhumika_alloy_castings/${folder}`,
      resource_type: 'image'
    });
    return result.secure_url;
  } catch (err) {
    console.error('  Upload failed:', err.message);
    return null;
  }
}

async function migrateCollection(Model, name, imageField) {
  const docs = await Model.find();
  console.log(`\n=== Migrating ${name}: ${docs.length} documents ===`);

  let migrated = 0;
  let skipped = 0;

  for (const doc of docs) {
    const imageValue = doc[imageField];
    if (!imageValue) {
      console.log(`  [SKIP] ${doc.title || doc.company || doc._id}: No image`);
      skipped++;
      continue;
    }
    if (!imageValue.startsWith('data:image')) {
      console.log(`  [SKIP] ${doc.title || doc.company || doc._id}: Already a URL`);
      skipped++;
      continue;
    }

    console.log(`  [UPLOAD] ${doc.title || doc.company || doc._id}...`);
    const url = await uploadToCloudinary(imageValue, name);
    if (url) {
      doc[imageField] = url;
      await doc.save();
      console.log(`    -> ${url}`);
      migrated++;
    } else {
      console.log(`    -> FAILED, keeping base64`);
    }
  }

  console.log(`  Done: ${migrated} migrated, ${skipped} skipped`);
}

async function main() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('Connected.');

  await migrateCollection(Product, 'products', 'image');
  await migrateCollection(Customer, 'customers', 'logo');
  await migrateCollection(Certificate, 'certificates', 'image');

  console.log('\n=== Migration complete ===');
  await mongoose.disconnect();
  process.exit(0);
}

main().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
