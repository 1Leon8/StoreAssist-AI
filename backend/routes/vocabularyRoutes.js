const express = require("express");

const { getProductVocabulary } = require("../controllers/vocabularyControllers");

const router = express.Router();

router.get("/vocabulary", getProductVocabulary);

module.exports = router;