const express = require("express");
const pool = require("../db/database");

const router = express.Router();

router.get("/inventory/:sku", (req, res) =>{
    
    const sku = req.params.sku;

    pool.query(
        `SELECT * FROM inventory AS i
         JOIN stores AS s
         ON i.store_id = s.store_id
         WHERE i.sku = $1`,
        [sku],
        (err, result) => {
    
            if (err) {
                console.error("Database query failed:", err);
                res.status(500).json({ error: "Database query failed" });
            } else {
                res.json(result.rows);
            }
        }
    )});

router.get("/product/:sku/inventory", (req, res) => {

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
            if (err) {
                console.error("Database query failed:", err);
                res.status(500).json({ error: "Database query failed" });
            } else {
                res.json(result.rows);
            }
        }
    );
});

module.exports = router;
