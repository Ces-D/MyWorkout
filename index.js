import "dotenv/config.js";
import express, { urlencoded } from "express";
import handlebars from "express-handlebars";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { routeHandler } from "./routes/index.js";
import { sequelize } from "./config/index.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
}

sequelize.sync();
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(
    cookieSession({
        name: "Session",
        secret: process.env.SESSION_SECRET,
        httpOnly: true,
        maxAge: 1 * 60 * 1000,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
app.use(routeHandler);

// Error Handler
app.use((err, req, res, next) => {
    console.log("Error", err.message);
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
