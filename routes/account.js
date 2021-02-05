import { Router } from "express";
import { loginRequired } from "../lib/loginHandler.js";

const accountRouter = Router();

/* User must be Logged In */
accountRouter.use(loginRequired);

// TODO: make the account handler
// the handler should fetch the user on get
// should handle puts and delete

// TODO: create the html

accountRouter.route("/account").get((req, res, next) => {
    res.render("account");
});



export default accountRouter;
