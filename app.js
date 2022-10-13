import express from "express";
import connectDb from "./config/db.js";
import morgan from "morgan";
import passport from "passport";
import passportConfig from "./config/passport.js";
import session from "express-session";
import { engine } from "express-handlebars";
import router from "./routes/index.js";
import authRouter from "./routes/auth.js";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

//Configure passport
passportConfig(passport);

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

//Session middleware
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongoUrl: process.env.MONGO_URI }),
    })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Static folder
app.use(express.static("public"));

//Routes
app.use("/", router);
app.use("/auth", authRouter);

connectDb();

app.listen(PORT, () =>
    console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`)
);
