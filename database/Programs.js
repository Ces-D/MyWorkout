import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config";

export default class Programs extends Model {}
Programs.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        programName: {
            type: DataTypes.STRING,
            unique: true,
        },
        trainer: {
            type: DataTypes.INTEGER,
            references: { model: User, key: "id" },
        },
        purpose: {
            type: DataTypes.STRING(1234),
        },
    },
    { sequelize }
);
