const vocabularyService = require("../services/vocabularyService");

const getProductVocabulary = async (req, res) => {
    const result = await vocabularyService.getProductVocabulary();
    return res.json(result);
};

module.exports = {
    getProductVocabulary
};