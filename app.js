import express from "express";
import connectDb from "./config/db.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import router from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

const app = express();

//Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//Handlebars
app.engine(".hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

//Routes
app.use("/", router);

connectDb();

app.listen(PORT, () =>
    console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`)
);
