import { User } from "../database/index.js";
import { NotFoundError, BadRequest } from "./errors.js";

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
        return await User.update({ where: { id: id }, updates });
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
