import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config";

export class Users extends Model {}
User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, timestamps: true }
);
