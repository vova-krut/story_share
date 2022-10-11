import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () =>
    console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`)
);
