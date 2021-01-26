const authRouter = require("express").Router();

authRouter
    .route("/")
    // GET Login Page
    .get((req, res, next) => {
        res.render("login", { pageTitle: "Login"});
    });

module.exports = authRouter;
