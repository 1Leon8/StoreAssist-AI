const express = require("express");
const pool = require("../db/database");

const router = express.Router();

router.get("/products", (req, res) =>{
    pool.query("SELECT * FROM products", (err, result) => {
        if (err){
            console.error("Database query failed:", err);
            res.status(500).json({ error: "Database query failed"});
        } else {
            res.json(result.rows);
        }
    });
});

router.get("/products/search", (req, res) => {
    const brand = req.query.brand;

    pool.query(
        "SELECT * FROM products WHERE brand = $1",
        [brand],
        (err, result) => {
            if (err) {
                console.error("Database query failed", err);
                res.status(500).json({ error: "Database query failed"});
            } else {
                res.json(result.rows);
            }
        }
    );
});

module.exports = router;