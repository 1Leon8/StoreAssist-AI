require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.query("SELECT * FROM products", (err, result) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Database connected:", result.rows[0]);
    }
});

app.get("/test", (req, res) => {
    res.json({ message: "StoreAssist API is working!" });
});

app.post("/search", (req, res) => {
    console.log(req.body);

    res.json({ message: "Search received!" });
});

app.listen(3000, () => {
    console.log("StoreAssist backend is running");
});