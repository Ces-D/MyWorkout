require("dotenv").config();
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const session = require("express-session");
const logger = require("morgan");
const path = require("path");

if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
}

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname, "/views/layouts"),
        partialsDir: path.join(__dirname, "/views/partials"),
        extname: "hbs",
        defaultLayout: "base",
    })
);
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

// Routes 
const routeHandler = require("./routes/index");
app.all("/*", routeHandler);

// Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).render("error", {
        errorTitle: "Oops!",
        errorMessage:
            "Sorry there was an error with our services. We are working to fix it!",
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).render("error", {
        errorTitle: "404 Page",
        errorMessage: "The page you are requesting does not exist",
    });
});

app.listen(process.env.PORT || 3000);
