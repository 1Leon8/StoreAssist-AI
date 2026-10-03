const express = require("express");

const { getProductInventory } = require("../controllers/inventoryControllers");

const router = express.Router();

router.get("/product/:sku/inventory", getProductInventory);

module.exports = router;
