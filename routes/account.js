import { Router } from "express";
import { loginRequired } from "../lib/loginHandler.js";
import {
    loadAccount,
    updateAccount,
    deleteAccount,
} from "../lib/accountHandler.js";
import { csurfProtection } from "../lib/csurf.js";

// TODO: Add the buttons and form for deleting and updating the user
const accountRouter = Router();

/* User must be Logged In */
accountRouter.use(loginRequired);

/* Csurf protection */
accountRouter.use(csurfProtection);

/* Account Page */
accountRouter
    .route("/account")

    .get((req, res, next) => {
        const user = loadAccount(res.locals.user);
        res.locals.options.userName = user.userName;
        res.locals.options.pageTitle = "Account";
        res.render("account", res.locals.options);
    });

// Edit Account Page
accountRouter

    .route("/account/edit")

    .post((req, res, next) => {
        const user = updateAccount(res.locals.user, {
            userName: req.userName,
            hashedPassword: req.password,
        });
        res.locals.options.userName = user.userName;
        res.locals.options.pageTitle = "Account";
        res.render("account", res.locals.options);
    });

/* Delete Account Page */
accountRouter

    .route("account/delete")

    .post((req, res, next) => {
        deleteAccount(res.locals.user);
        req.session = null;
        res.redirect("/login");
    });

export default accountRouter;
