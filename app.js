import express from "express";
import connectDb from "./config/db.js";
import morgan from "morgan";
import passport from "passport";
import passportConfig from "./config/passport.js";
import session from "express-session";
import { engine } from "express-handlebars";
import router from "./routes/index.js";
import authRouter from "./routes/auth.js";
import storiesRouter from "./routes/stories.js";
import MongoStore from "connect-mongo";
import { formatDate, stripTags, truncate, editIcon } from "./helpers/hbs.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

//Configure passport
passportConfig(passport);

const PORT = process.env.PORT || 5000;

const app = express();

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//Handlebars
app.engine(
    ".hbs",
    engine({
        helpers: { formatDate, stripTags, truncate, editIcon },
        defaultLayout: "main",
        extname: ".hbs",
    })
);
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

//Set global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    return next();
});

//Static folder
app.use(express.static("public"));

//Routes
app.use("/", router);
app.use("/auth", authRouter);
app.use("/stories", storiesRouter);

connectDb();

app.listen(PORT, () =>
    console.log(`Server started in ${process.env.NODE_ENV} on port ${PORT}`)
);
