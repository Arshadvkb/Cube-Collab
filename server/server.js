import "dotenv/config";
import express from "express";
import cookiparser from "cookie-parser"
import cors from "cors"

const app=express()
const port=process.env.PORT || 5000


app.get("/",(req,res)=>{
    res.send("Realtime Collaboration System \"CUBE COLLAB\"");

})


app.listen(port,()=>{
    console.log(`sever running at http://localhost:${port}`);
})