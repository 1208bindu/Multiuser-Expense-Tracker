const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema({
  details: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
