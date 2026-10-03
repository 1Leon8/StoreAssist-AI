const inventoryService = require("../services/inventoryService");

const getProductInventory = async (req, res) => {

    const sku = req.params.sku;

    const store_num = req.query.store_id;

    try {
        const result = await inventoryService.getProductInventory(sku);

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Product or inventory not found"
            });
        }

        for (let i = 0; i < result.rows.length; i++) {
            if (result.rows[i].quantity === 0) {
                result.rows[i].status = "Out of Stock";
            } else {
                result.rows[i].status = "In Stock";
            }
        }

        let currentStore;
        for (let i = 0; i < result.rows.length; i++) {
            if (result.rows[i].store_id === store_num) {
                currentStore = result.rows[i];
            }
        }

        const otherStores = result.rows.filter(
            store => store.store_id !== store_num
        );

        return res.json({
            currentStore: currentStore,
            otherStores: otherStores
        });

    } catch (err) {
        console.error("Database query failed:", err);
        res.status(500).json({
            error: "Database query failed"
        });
    }
};

module.exports = { getProductInventory };