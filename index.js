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
import errorHandler from "./lib/errorHandler.js";

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
    errorHandler(err);
});

// 404 Handler
app.use((req, res) => {
    res.status(404).render("error", {
        errorTitle: "Page Not Found",
        errorMessage: "The page you are requesting does not exist",
    });
});

app.listen(process.env.PORT || 3000);
