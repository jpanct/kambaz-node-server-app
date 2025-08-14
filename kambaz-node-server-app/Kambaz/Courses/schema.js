import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  _id: String,  // This allows custom IDs like "RS101"
  name: String,
  number: String,
  startDate: Date,
  endDate: Date,
  department: String,
  credits: Number,
  description: String,
  author: String,
  image: String
});

export default courseSchema;