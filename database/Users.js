import Sequelize from "sequelize";
import { sequelize } from "../config/index.js";
import bcrypt from "bcrypt";

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
                const hash = bcrypt.hashSync(value, 10);
                this.setDataValue("hashedPassword", hash);
            },
        },
    },
    { sequelize, timestamps: false }
);
