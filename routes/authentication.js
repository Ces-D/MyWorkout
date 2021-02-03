import { Router } from "express";
import { csurfProtection } from "../lib/csurf.js";
import { loginValidation, loginHandler } from "../lib/loginHandler.js";
import {
    registrationValidation,
    registrationHandler,
} from "../lib/registrationHandler.js";

const authRouter = Router();
//TODO: create first User and log in first User
// TODO: complete registrationValidation
// TODO: complete, export then import errorHandler

/* Login Status Check */
authRouter.use((req, res, next) => {
    if (req.user) {
        res.send("User Already Logged In"); // TODO: testing
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
        res.send("Login was Successful"); // TODO: test
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
        res.send("Registration Successful"); //TODO: test
    });

export default authRouter;
