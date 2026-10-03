const pool = require("../db/database");

const getProductInventory = (sku) => {
    return pool.query(
        `SELECT 
            p.product,
            p.size,
            p.brand,
            s.store_name,
            s.location,
            s.store_id,
            i.quantity,
            i.aisle,
            i.bay
        FROM products AS p
        JOIN inventory AS i ON p.sku = i.sku
        JOIN stores AS s ON i.store_id = s.store_id
        WHERE p.sku = $1;`,
        [sku]
    );
};

module.exports = { getProductInventory };