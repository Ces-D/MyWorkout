import { Router } from "express";

const authRouter = Router();

authRouter
    /* Login Page */
    .route("/login")

    // GET Login Page
    .get((req, res, next) => {
        res.render("login", { pageTitle: "Login" });
    })

    // POST Login Logic
    .post(async (req, res, next) => {
        try {
            res.send("Success Logging In"); // TODO: Success Logic
        } catch (error) {
            if (error instanceof AuthenticationError) {
                res.render("login", {
                    pageTitle: "Login",
                    Errors: error.message,
                });
            } else {
                next(error);
            }
        }
    });
authRouter
    /* Register Page */
    .route("/register")

    // GET Register PAge
    .get((req, res, next) => {
        res.render("register", { pageTitle: "Register" });
    })

    // POST Register Page
    .post(async (req, res, next) => {
        try {
        } catch (error) {}
    });

export default authRouter;
