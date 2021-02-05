import Sequelize from "sequelize";
import { sequelize } from "../config/index.js";

export class Exercise extends Sequelize.Model {}
Exercise.init(
    {
        exercise: {
            type: Sequelize.DataTypes.STRING,
        },
        weight: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
        },
        reps: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
        },
        duration: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
        },
    },
    { sequelize, timestamps: true }
);
