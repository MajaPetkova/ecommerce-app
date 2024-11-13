import express from "express";
import { getProducts, removeProduct, singleProduct, addProduct } from "../controllers/productController.js";

const productRouter= express.Router();


productRouter.get("/list", getProducts);
productRouter.post("/add", addProduct);
productRouter.post("/single", singleProduct);
productRouter.post("/remove", removeProduct);

export default productRouter;