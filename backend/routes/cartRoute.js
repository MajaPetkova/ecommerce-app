import express from "express";
import { addToCard, updateCart, getUserCard } from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter= express.Router();

cartRouter.post('/get',authUser, getUserCard);
cartRouter.post('/update',authUser, updateCart);
cartRouter.post('/add',authUser, addToCard);

export default cartRouter;