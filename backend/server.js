require("dotenv").config();

const express = require("express");
const pool = require("./db/database");
const productRoutes = require("./routes/productRoutes");


const app = express();

app.use(express.json());

app.use("/", productRoutes);

app.get("/test", (req, res) => {
    res.json({ message: "StoreAssist API is working!" });
});


app.listen(3000, () => {
    console.log("StoreAssist backend is running");
});