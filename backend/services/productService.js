const pool = require("../db/database");

const getProductSearch = async (brand, material, size, product, product_family) => {

    const conditions = [];

    const values = [];

    if (brand) {
        conditions.push(`brand ILIKE $${values.length + 1}`);
        values.push(brand);
    }

    if (material) {
        conditions.push(`material ILIKE $${values.length + 1}`);
        values.push(material);
    }

    if (size) {
        conditions.push(`size ILIKE $${values.length + 1}`);
        values.push(size);
    }

    if (product) {
        conditions.push(`product ILIKE $${values.length + 1}`);
        values.push(product);
    }

    if (product_family) {
        conditions.push(`product_family ILIKE $${values.length + 1}`);
        values.push(product_family);
    }

    // Build the SQL query using the conditions we collected
    const query = `SELECT * FROM products WHERE ${conditions.join(" AND ")}`;

    // Execute the query and return the result to the controller
    const result = await pool.query(query, values);

    return result;
};

module.exports = { getProductSearch };