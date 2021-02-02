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
                bcrypt.hash(value, 10).then(function (hash) {
                    this.setDataValue("hashedPassword", hash);
                });
            },
        },
    },
    { sequelize, timestamps: false }
);
