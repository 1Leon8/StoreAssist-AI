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

    //Get the search parameters from the URL
    const { brand, material, size } = req.query;

    //Array to store the SQL conditions and their values
    const conditions = [];
    const values = [];

    //If the user provides a brand, add it to the search
    if (brand) {
        conditions.push(`brand = $${values.length + 1}`);
        values.push(brand);
    }

    //If the user provides a material, add it to the search
    if (material) {
        conditions.push(`material = $${values.length + 1}`);
        values.push(material);
    }

    //If the user provides a size, add it to the search
    if (size){
        conditions.push(`size = $${values.length + 1}`);
        values.push(size);
    }

    //Build the SQL query using the conditions we collected
    const query = `SELECT * FROM products WHERE ${conditions.join(" AND ")}`;

    //Ensuring the user provided at least one parameter
    if (conditions.length === 0) {
        return res.status(400).json({
            error: "Please provide at least one seach parameter"
        });
    };

    //Send the query and values to PostgreSQL
    pool.query(
        query,
        values,
        (err, result) => {

            //Handle database errs
            if (err) {
                console.error("Database query failed", err);
                res.status(500).json({ error: "Database query failed"});

            //Send the matching products back to the frontend
            } else {
                res.json(result.rows);
            }
        }
    );
});

module.exports = router;