import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Job } from './models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
const URI = process.env.MONGO_URI || "mongodb+srv://nikhilkashyapkn_db_user:bhumika@cluster0.pblbglz.mongodb.net/?appName=Cluster0";

mongoose.connect(URI)
  .then(async () => {
    const jobs = await Job.find({});
    console.log("ALL JOBS IN DB:");
    console.log(JSON.stringify(jobs, null, 2));
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
