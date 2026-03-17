import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"

const port=process.env.PORT || 5000

const app=express()
app.use(cookieParser())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Realtime Collaboration System \"CUBE COLLAB\"");

})


app.listen(port,()=>{
    console.log(`sever running at http://localhost:${port}`);
})