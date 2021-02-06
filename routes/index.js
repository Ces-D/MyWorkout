import { Router } from "express";
import authRouter from "./authentication.js";
import adminRouter from "./admin.js";
import accountRouter from "./account.js";

export const routeHandler = Router();

routeHandler.use("/admin/", adminRouter);
routeHandler.use("/", authRouter);
routeHandler.use("/", accountRouter);
