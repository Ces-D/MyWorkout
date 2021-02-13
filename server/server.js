import "dotenv/config.js";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { routeHandler } from "../routes/index.js";
import { sequelize } from "../config/index.js";

import errorHandler from "../lib/errorHandler.js";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        if (process.env.NODE_ENV === "development") {
            server.use(logger("dev"));
        }

        sequelize.sync();
        server.use(helmet());
        server.use(compression());
        server.use(cors());
        server.use(
            cookieSession({
                name: "Session",
                secret: process.env.SESSION_SECRET,
                httpOnly: true,
                maxAge: 1 * 60 * 1000,
            })
        );
        server.use(cookieParser());
        server.use(express.json());
        server.use(express.urlencoded({ extended: false }));

        // Routes
        server.use(handle(routeHandler));

        // Error Handler
        server.use(errorHandler);

        // 404 Handler
        server.use((req, res) => {
            res.status(404).render("error", {
                errorTitle: "Page Not Found",
                errorMessage: "The page you are requesting does not exist",
            });
        });

        server.listen(process.env.PORT || 3000, (err) => {
            if (err) throw err;
        });
    })
    .catch((ex) => console.log(ex.stack));
