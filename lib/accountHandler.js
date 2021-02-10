import { body } from "express-validator";
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
        const user = await User.findByPk(id);
        return user.dataValues.userName;
    } catch (error) {
        throw new NotFoundError(error);
    }
};

export const updateAccount = async (id, body) => {
    try {
        let updates = {};
        if (body["password"] || 0 !== body["password"].length) {
            updates.hashedPassword = body.password;
        }
        if (body["username"] || 0 !== body["username"].length) {
            updates.userName = body.username;
        }
        const user = await User.findByPk(id);
        await user.update(updates);
        // TODO: Error on the redirect back to /account
        // set header issue
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
