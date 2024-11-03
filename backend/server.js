import express from "express";
import cors from "cors";
import "dotenv/config"
import connectDB from "./config/mongodb.js";

//App config
const app = express();
const port = process.env.PORT || 5005;
connectDB()

//middlewares 
app.use(express.json());
app.use(cors())


//api endpoints
app.get("/", (req, res)=>{
res.send("Home")
})

app.listen(port, console.log(`Server is listening on ${port}`))

