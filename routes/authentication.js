import { Router } from "express";
import { User } from "../database/index.js";
import { encryptPassword } from "../utils/encryption.js";

const authRouter = Router();
//TODO: create first User and log in first User
// TODO: implement sessions for login status
// TODO: create login check for other routes redirecting to login
// TODO: Create lib to handle methods to not pollute this page?
// TODO: Consider client-session packakage and using scrypt or argon2
// TODO implement csurf into html templates


/* Login Page */
authRouter
    .route("/login")

    // GET Login Page
    .get(async (req, res, next) => {
        res.render("login", { pageTitle: "Login" });
    })

    // POST Login Logic
    .post(async (req, res, next) => {
        try {
            const { userName, password } = req.body;
            const user = await User.findOne({ where: { userName: userName } });
            if (user) {
                if (encryptPassword(password) === user.password) {
                    // Login the user because they match
                }
                // user and password do not match
                // Authentication Error
            }
            // user does not exist with that name
            // Authentication Error
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

/* Register Page */
authRouter
    .route("/register")

    // GET Register PAge
    .get((req, res, next) => {
        res.render("register", { pageTitle: "Register" });
    })

    // POST Register Page
    .post(async (req, res, next) => {
        try {
            const { userName, password } = req.body;
            // createUser
            // Errors such as unique Error
        } catch (error) {}
    });

export default authRouter;
