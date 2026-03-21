import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import swaggerUi from "swagger-ui-express";
import session from "express-session"

import swaggerSpec from "./utils/swagger.js";
import connectDb from "./config/mongodb.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import documentRouter from "./routes/document.route.js";

const port = process.env.PORT || 5000

const app = express()
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(session({
    secret: 'your_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true only for HTTPS
}));



//app routes 
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.send("Realtime Collaboration System \"CUBE COLLAB\"");
})


app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/document", documentRouter)

connectDb()
app.listen(port, () => {
    console.log(`sever running at http://localhost:${port}`);
})