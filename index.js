import "dotenv/config.js";
import express from "express";
import handlebars from "express-handlebars";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import session from "express-session";
import logger from "morgan";
import { join } from "path";
import routeHandler from "./routes/index.js";
import sequelize from "./config/index.js";
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
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine(
    "hbs",
    handlebars({
        layoutsDir: join(__dirname, "/views/layouts"),
        partialsDir: join(__dirname, "/views/partials"),
        extname: "hbs",
        defaultLayout: "base",
    })
);
app.set("view engine", "hbs");
app.use(express.static(join(__dirname, "public")));

// Routes
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
