import { body} from "express-validator";
import { User } from "../database/index.js";
import { NotFoundError, BadRequest } from "./errors.js";

export const optionalUpdateValidation = [
    body("username")
        .isLength({ min: 3 })
        .withMessage("Must be a little longer ")
        .optional(),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Must be 8 characters or more")
        .matches("[0-9]")
        .withMessage("Must contain numbers")
        .matches("[A-Z]")
        .withMessage("Must contain capital letters")
        .optional(),
];

export const loadAccount = async (id) => {
    try {
        return await User.findOne({
            where: { id: id },
        });
    } catch (error) {
        throw new NotFoundError(error);
    }
};

export const updateAccount = async (id, updates) => {
    try {
        console.log(updates);
        // return await User.update({ where: { id: id }, updates });
    } catch (error) {
        throw new BadRequest(error);
    }
};

export const deleteAccount = async (id) => {
    try {
        return await User.destroy({ where: { id: id } });
    } catch (error) {
        throw new BadRequest(error);
    }
};
