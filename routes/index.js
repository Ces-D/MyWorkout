import { Router } from "express";
import authRouter from "./authentication.js";
const routeHandler = Router();

routeHandler.use(authRouter);

export default routeHandler;
