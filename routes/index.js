import { Router } from "express";
import authRouter from "./authentication.js";
import adminRouter from "./admin.js";

export const routeHandler = Router();

routeHandler.use("/", authRouter);
routeHandler.use("/admin/", adminRouter);
