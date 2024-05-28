const express = require("express");
const { guess } = require("../models/guessSchema.js");
const { solution } = require("../models/solutionSchema.js");

const router = express.Router();

router.get("/guess", async (request, response) => {
  try {
    const result = await guess.findOne({
      word: request.query.word,
    });
    return response.status(200).json({
      message: result.word,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

router.get("/solution", async (request, response) => {
  try {
    const result = await solution.aggregate([
      {
        $sample: {
          size: 1,
        },
      },
    ]);

    return response.status(200).json({
      message: result[0].word,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error });
  }
});

exports.wordleRoutes = router;
