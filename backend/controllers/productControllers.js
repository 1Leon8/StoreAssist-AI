const productService = require("../services/productService");
const aiService = require("../services/aiService");

const getProductSearch = async (req, res) => {

    const { request } = req.query;

    let { brand, material, size, product, product_family } = req.query;

    // Ensure at least one search parameter was provided
    if (!request && !brand && !material && !size && !product && !product_family) {
        return res.status(400).json({
            error: "Please provide at least one search parameter"
        });
    }

    try {
        if (request){
            const interpretedRequest = await aiService.interpretProductRequest(request);

            ({ brand, material, size, product, product_family} = interpretedRequest); 
        }

        const result = await productService.getProductSearch(
            brand,
            material,
            size,
            product,
            product_family
        );

        const searchCriteria = {
            brand,
            material,
            size,
            product,
            product_family
        };


        const referenceProduct = result.rows[0] || null;
        const recommendations = await productService.recommendProducts(
            referenceProduct, 
            searchCriteria);

        return res.json({
            product: referenceProduct,
            recommendations: recommendations
        });

    } catch (err) {

        console.error("Product search failed:", err);

        return res.status(500).json({
            error: "Database query failed"
        });

    }

};

module.exports = { getProductSearch };