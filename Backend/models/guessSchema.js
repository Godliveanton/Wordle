const mongoose = require("mongoose");

const guessSchema = mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
});

exports.guess = mongoose.model("guess", guessSchema, "guess");
