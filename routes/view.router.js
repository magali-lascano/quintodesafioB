import { Router } from "express";
import ProductManager from "../dao/managers/productmanager.js";

const router = Router();
// const ProductManager = new ProductManager(__dirname + "/product.json");

router.get("/", async(req, res) => {
    const products = await ProductManager.getProducts();
    res.render("home", { products });
});

router.get("/realtimeproducts", async(req, res) => {
    const products = await ProductManager.getProducts();
    res.render("realtimeproducts", { products });
});

export default router;