import express from "express";
import connectDb from "./config/db.js";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

const app = express();

//Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

connectDb();

app.listen(PORT, () =>
    console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`)
);
