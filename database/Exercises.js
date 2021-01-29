import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config";

export default class Exercises extends Model {}
Exercises.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        gymSession: {
            type: DataTypes.INTEGER,
            references: { model: GymSession, key: "id" },
        },
        exercise: {
            type: DataTypes.STRING,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        reps: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    { db, timestamps: true }
);
