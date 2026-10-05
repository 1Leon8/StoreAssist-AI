const pool = require("../db/database");

const getProductVocabulary = async () => {

    const result = await pool.query(
    `SELECT
        ARRAY_AGG(DISTINCT product) AS products,
        ARRAY_AGG(DISTINCT product_family) AS product_families,
        ARRAY_AGG(DISTINCT material) AS materials,
        ARRAY_AGG(DISTINCT size) AS sizes,
        ARRAY_AGG(DISTINCT brand) AS brands 
    FROM products;
    `);

    return result.rows[0];
};

module.exports = {
    getProductVocabulary
};
