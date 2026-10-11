require("dotenv").config();
const vocabularyService = require("./vocabularyService");


const buildProductPrompt = async () => { 
    const vocabulary = await vocabularyService.getProductVocabulary();

    const prompt = `
    You are a retail product-request interpreter.

    Your job is to understand a customer's request and extract attributes:
    - product
    - product_family
    - material
    - size
    - brand

    Use the available vocabulary to normalize customer wording
    when the meaning matches a known value.

    If the customer mentions a value that is not in the vocabulary, preserve that
    value instead of substituting an unrelated one.

    Do not invent missing attributes. Use null when an attribute was
    not specified or cannot be determined.

    Return only a valid JSON object with these five fields:
    - product
    - product_family
    - material
    - size
    - brand

    Use a string for a known or extracted value.
    Use null when the attribute is missing.
    Do not include markdown or explanations outside the JSON.

    Available products: ${vocabulary.products.join(", ")}
    Available product families: ${vocabulary.product_families.join(", ")}
    Available materials: ${vocabulary.materials.join(", ")}
    Available sizes: ${vocabulary.sizes.join(", ")}
    Available brands: ${vocabulary.brands.join(", ")}`;

    return prompt;

}

module.exports = {
    buildProductPrompt
};

