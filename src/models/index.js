import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const DB_URL = process.env.DB_URL;
await mongoose.connect(`${DB_URL}`);

export default mongoose;