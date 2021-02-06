import { Router } from "express";
import { loginRequired } from "../lib/loginHandler.js";
import { loadAccount } from "../lib/accountHandler.js";
import { csurfProtection } from "../lib/csurf.js";

const accountRouter = Router();

/* User must be Logged In */
accountRouter.use(loginRequired);

/* Csurf protection */
accountRouter.use(csurfProtection);

/* Account Page */
accountRouter
    .route("/account")

    .get(loadAccount);

// Edit Account Page
accountRouter.route("/account/edit");

/* Delete Account Page */
accountRouter.route("account/delete");

export default accountRouter;
