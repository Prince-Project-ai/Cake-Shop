import dotenv from "dotenv";
dotenv.config();

import cors from "cors";


import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session"; // Correct package

import { ConnectToDB } from "./DB/Config.js";
import "./Utils/passport.js"; // Your Google OAuth setup
import userRouter from "./Routes/User.router.js"; // Your auth + user routes
import errorHandler from "./Middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5555;

// Connect to MongoDB
ConnectToDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session (required for passport)
app.use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/client", userRouter);

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to server route");
});

app.use(errorHandler)

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SERVER IS RUNNING AT PORT: ${PORT}`);
});
