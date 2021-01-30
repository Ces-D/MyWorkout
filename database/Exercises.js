import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config";

export class Exercise extends Model {}
Exercise.init(
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
    { sequelize, timestamps: true }
);
