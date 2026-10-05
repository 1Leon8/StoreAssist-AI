const express = require("express");

const { getProductSearch } = require("../controllers/productControllers");

const router = express.Router();

// Search products
router.get("/products/search", getProductSearch);

module.exports = router;