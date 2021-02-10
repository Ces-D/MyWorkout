import { Router } from "express";
import { validationResult } from "express-validator";
import { loginRequired } from "../lib/loginHandler.js";
import { FormatError } from "../lib/errors.js";
import {
    loadAccount,
    updateAccount,
    deleteAccount,
    optionalUpdateValidation,
} from "../lib/accountHandler.js";
import { csurfProtection } from "../lib/security.js";

// TODO: Add the buttons and form for deleting and updating the user
const accountRouter = Router();

/* User must be Logged In */
accountRouter.use(loginRequired);

/* Csurf protection */
accountRouter.use(csurfProtection);

/* Account Page */
accountRouter
    .route("/account")

    .get(async (req, res, next) => {
        const user = await loadAccount(res.locals.user);
        res.locals.options.userName = user;
        res.locals.options.pageTitle = "Account";
        res.render("account", res.locals.options);
    });

// Edit Account Page
accountRouter

    .route("/account/edit")
    .get((req, res, next) => {
        res.locals.csrfToken = req.csrfToken();
        res.render("accountEdit", res.locals.options);
    })

    .post(optionalUpdateValidation, async (req, res, next) => {
        const validationError = validationResult(req);
        if (!validationError.isEmpty()) {
            next(new FormatError(validationError.array()));
        }
        await updateAccount(res.locals.user, req.body);
        res.redirect("/account");
    });

/* Delete Account Page */
accountRouter

    .route("account/delete")

    .get(async (req, res, next) => {
        await deleteAccount(res.locals.user);
        req.session = null;
        res.redirect("/login");
    });

export default accountRouter;
