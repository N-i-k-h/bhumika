import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const result = await mongoose.connection.db.collection('products').updateMany(
    { industry: 'defence' },
    { $set: { industry: 'automobile' } }
  );
  console.log('Updated', result.modifiedCount, 'products from defence to automobile');
  await mongoose.disconnect();
});
