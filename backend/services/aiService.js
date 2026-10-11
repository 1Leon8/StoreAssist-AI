require("dotenv").config();
const vocabularyService = require("./vocabularyService");


const buildProductPrompt = async (customerRequest) => { 
    const vocabulary = await vocabularyService.getProductVocabulary();

    const prompt = `
    You are a retail product-request interpreter.

    Your job is to extract these five attributes from the customer's request:

    - product: A specific catalog product, only if the customer explicitly
    identifies it. Otherwise, use null.
    - product_family: The general category of the item requested.
    Match it to the available product families whenever possible.
    For example, "drill bit" maps to "Drill Bits".
    Do not use null if the customer's item clearly matches a
    known product family.
    - material: The material requested, or null if not specified.
    - size: The requested size, or null if not specified.
    - brand: The brand explicitly mentioned by the customer, or null.

    Examples:
    - "I need a drill bit for concrete"
    product: null
    product_family: "Drill Bits"
    material: "Concrete"
    size: null
    brand: null

    - "I need a DEWALT drill bit for concrete"
    product: "DEWALT Drill Bit"
    product_family: "Drill Bits"
    material: "Concrete"
    size: null
    brand: "DEWALT"

    Use the available vocabulary to normalize customer wording
    when the meaning matches a known value.

    If the customer mentions a value that is not in the vocabulary, preserve that
    value instead of substituting an unrelated one.

    Do not invent missing attributes. Use null when an attribute was
    not specified or cannot be determined.
    Never infer or assume a brand that the customer did not mention.
    Only fill in the product field with a specific product name when
    the customer clearly identifies that product.
    Normalize number words into numeric sizes when possible.
    For example, "ten-inch" should become "10 in".

    IMPORTANT:
    - A product family is not a specific product.
    - "Drill bit" means product_family "Drill Bits", not product "DEWALT Drill Bit".
    - Only return a product name from the available products if the customer
    explicitly identifies that specific product.
    - Never extract a brand from a product name unless the customer mentioned
    that brand in their request.

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
    Available brands: ${vocabulary.brands.join(", ")}
    
    Customer request: "${customerRequest}"

    Extract the product attributes from this customer request.
    `;

    return prompt;

}


const interpretProductRequest = async (customerRequest) => {
    const prompt = await buildProductPrompt(customerRequest);

    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application.json"
        },
        body: JSON.stringify({
            model: "llama3.2:3b",
            prompt: prompt,
            stream: false
        })
    });

    const data = await response.json();

    const result = JSON.parse(data.response);

    for (const key of ["product", "product_family", "material", "size", "brand"]){
        if (result[key] === "null" || result[key] === ""){
            result[key] = null;
        }
    }

    return result;
}

module.exports = {
    buildProductPrompt,
    interpretProductRequest
};

