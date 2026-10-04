const productService = require("../services/productService");

const getProductSearch = async (req, res) => {

    const { brand, material, size, product, product_family } = req.query;

    // Ensure at least one search parameter was provided
    if (!brand && !material && !size && !product && !product_family) {
        return res.status(400).json({
            error: "Please provide at least one search parameter"
        });
    }

    try {

        const result = await productService.getProductSearch(
            brand,
            material,
            size,
            product,
            product_family
        );

        return res.json(result.rows);

    } catch (err) {

        console.error("Product search failed:", err);

        return res.status(500).json({
            error: "Database query failed"
        });

    }

};

module.exports = { getProductSearch };