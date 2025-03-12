import mongoose from "mongoose";
import { mongodbURI } from "./constaints.js";

async function connectDB() {
  try {
    await mongoose.connect(mongodbURI);
    console.log(`Connected To mongoDB`);
  } catch (error) {
    console.log(`Error connection To mongoDB ${error}`);
  }
}

export default connectDB;
