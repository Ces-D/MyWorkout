import { Router } from "express";
import authRouter from "./authentication.js";

export const routeHandler = Router();

routeHandler.use("/", authRouter);
