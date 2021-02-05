import { User } from "../database/index.js";
import { body, validationResult } from "express-validator";
import { FormatError, AuthenticationError } from "./errors.js";

export const registrationValidation = [
    body("username")
        .isLength({ min: 3 })
        .withMessage("Must be a little longer "),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Must be 8 characters or more")
        .matches("[0-9]")
        .withMessage("Must contain numbers")
        .matches("[A-Z]")
        .withMessage("Must contain capital letters"),
    // body("password2") /////////// This is an issue
    //     .matches(body("password"))
    //     .withMessage("Passwords do not match"),
];

// TODO: Validation is somehow not doing anything
export const registrationHandler = async (req, res, next) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        next(new FormatError(validationError.array()));
    }
    try {
        const user = await User.findOne({
            where: { userName: req.body.username },
        });
        if (user) {
            throw new AuthenticationError("User already exists");
        } else {
            await User.create(
                {
                    userName: req.body.username,
                    hashedPassword: req.body.password,
                },
                { fields: ["userName", "hashedPassword"] }
            );
            next();
        }
    } catch (error) {
        next(error);
    }
};
