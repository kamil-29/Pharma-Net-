const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeedBackSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 1,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
});

const FeedBackModel = mongoose.model("FEEDBACK", FeedBackSchema);
module.exports = { FeedBackModel };
