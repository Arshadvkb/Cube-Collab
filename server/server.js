import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"


import connectDb from "./config/mongodb.js";
import authRouter from "./routes/auth.route.js";


const port=process.env.PORT || 5000

const app=express()
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Realtime Collaboration System \"CUBE COLLAB\"");
})



//app routes 
app.use("/api/auth",authRouter)

connectDb()
app.listen(port,()=>{
    console.log(`sever running at http://localhost:${port}`);
})