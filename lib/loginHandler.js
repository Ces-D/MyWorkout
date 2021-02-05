import { User } from "../database/index.js";
import { body, validationResult } from "express-validator";
import { FormatError, AuthenticationError, NotFoundError } from "./errors.js";
import bcrypt from "bcrypt";

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else res.redirect("/login");
};

export const loginValidation = [
    body("username")
        .isLength({ min: 2 })
        .withMessage("Must be a little longer "),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Must be 8 characters or more")
        .matches("[0-9]")
        .withMessage("Must contain numbers")
        .matches("[A-Z]")
        .withMessage("Must contain capital letters"),
];

export const loginHandler = async (req, res, next) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        next(new FormatError(validationError.array()));
    }
    try {
        const user = await User.findOne({
            where: { userName: req.body.username },
        });
        if (user) {
            const passwordValid = bcrypt.compare(
                req.body.password,
                user.hashedPassword
            );
            if (passwordValid) {
                req.session.cred = user.id;
                next();
            } else {
                throw new AuthenticationError("User not authenticated");
            }
        } else {
            throw new NotFoundError("User does not exist");
        }
        // validate info is coming in correct form (err, res)
        // make sure user exists
    } catch (error) {
        next(error);
    }
};
