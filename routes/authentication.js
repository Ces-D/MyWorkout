import { Router } from "express";
import { csurfProtection } from "../lib/csurf";
import { loginValidation, loginHandler } from "../lib/loginHandler";
import {
    registrationValidation,
    registrationHandler,
} from "../lib/registrationHandler";

const authRouter = Router();
//TODO: create first User and log in first User
// TODO: complete registrationValidation
// TODO: complete, export then import errorHandler

/* Csrf Protection */
authRouter.use(csurfProtection);

/* Login Status Check */
authRouter.use((req, res, next) => {
    if (req.user) {
        res.send("User Already Logged In"); // TODO: testing
    } else next();
});

/* Login Page */
authRouter
    .route("/login")

    .get(async (req, res, next) => {
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
            csrffToken: req.csrfToken(),
        });
    })

    .post(registrationValidation, registrationHandler, (req, res, next) => {
        res.send("Registration Successful"); //TODO: test
    });

export default authRouter;
