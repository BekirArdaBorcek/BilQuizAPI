import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctOption: Number,
});

export default mongoose.model("QuizSchema", QuizSchema);
