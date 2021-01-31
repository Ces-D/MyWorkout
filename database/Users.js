import Sequelize from "sequelize";
import sequelize from "../config/index.js";
import { encryptPassword } from "../utils/encryption.js";

export class User extends Sequelize.Model {}
User.init(
    {
        userName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hashedPassword: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue("password", encryptPassword(value));
            },
        },
    },
    { sequelize, timestamps: false }
);
