import Sequelize from "sequelize";
import { sequelize } from "../config/index.js";

export class Program extends Sequelize.Model {}
Program.init(
    {
        programName: {
            type: Sequelize.DataTypes.STRING,
            unique: true,
        },
        purpose: {
            type: Sequelize.DataTypes.STRING(1234),
        },
    },
    { sequelize }
);
