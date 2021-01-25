const routeHandler = require("express").Router();
const authRouter = require("./authentication");

routeHandler.use(authRouter);

module.exports = routeHandler;
