const pool = require ("../db/database");

const getProductInventory = (req, res) => {
    const sku = req.params.sku;

    pool.query(
        `SELECT 
            p.product,
            p.size,
            p.brand,
            s.store_name,
            s.location,
            i.quantity,
            i.aisle,
            i.bay
        FROM products AS p
        JOIN inventory AS i ON p.sku = i.sku
        JOIN stores AS s ON i.store_id = s.store_id
        WHERE p.sku = $1;`,
        [sku],
        (err, result) => {
            if (err){ 
                console.error("Database query failed:", err);
            } else {
                res.json(result.rows);
            }
        }
    
    );
};

module.exports = { getProductInventory };