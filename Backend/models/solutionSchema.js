const mongoose = require("mongoose");

const solutionSchema = mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
});

exports.solution = mongoose.model("solution", solutionSchema, "solution");
