const express = require("express");
const pool = require("../db/database");

const { getProductSearch } = require("../controllers/productControllers");

const router = express.Router();

// Search products
router.get("/products/search", getProductSearch);

module.exports = router;