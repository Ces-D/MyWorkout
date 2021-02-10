import { Router } from "express";
import { csurfProtection } from "../lib/security.js";
import {
    loginRequired,
    loginValidation,
    loginHandler,
} from "../lib/loginHandler.js";
import {
    registrationValidation,
    registrationHandler,
} from "../lib/registrationHandler.js";

const authRouter = Router();

/* Login Status Check */
authRouter.use((req, res, next) => {
    if (req.user) {
        res.redirect("/account");
    } else next();
});

/* Csurf Protection */
authRouter.use(csurfProtection);

/* Login Page */
authRouter
    .route("/login")

    .get((req, res, next) => {
        res.render("login", {
            pageTitle: "Login",
            csrfToken: req.csrfToken(),
        });
    })

    .post(loginValidation, loginHandler, (req, res, next) => {
        res.redirect("/account");
    });

/* Register Page */
authRouter
    .route("/register")

    .get((req, res, next) => {
        res.render("register", {
            pageTitle: "Register",
            csrfToken: req.csrfToken(),
        });
    })

    .post(registrationValidation, registrationHandler, (req, res, next) => {
        res.redirect("/login");
    });

/* Logout Page */
authRouter.route("/logout").get(loginRequired, (req, res, next) => {
    req.session = null;
    res.redirect("/login");
});

export default authRouter;
