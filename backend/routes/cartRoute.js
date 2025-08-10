import express from "express";
import { addToCard, updateCart, getUserCard } from "../controllers/cartController.js";

const cartRouter= express.Router();

cartRouter.post('/get', getUserCard);
cartRouter.post('/update', updateCart);
cartRouter.post('/add', addToCard);

export default cartRouter;