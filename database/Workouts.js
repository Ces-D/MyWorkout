import Sequelize from "sequelize";
import { sequelize } from "../config/index.js";

export class Workout extends Sequelize.Model {
    getWorkoutLength() {
        // assuming they are updating their workouts as they go
        // the time a session is created should differ from the last time it was updated at
        return this.sessionEnd - this.sessionStart;
    }
}
Workout.init(
    {
        // Program this workout is a part of
        // optional
        programName: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
        },
        // Date the workout is suppose to be had
        sessionDate: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.DataTypes.NOW,
        },
        // actual start of workout
        sessionStart: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        // actual end fo workout
        sessionEnd: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        // Goal of the exercises in gym session
        goal: {
            type: Sequelize.DataTypes.STRING(1234),
            allowNull: true,
        },
        // Any notes regarding the workouts or gym session
        notes: {
            type: Sequelize.DataTypes.STRING(1234),
            allowNull: true,
        },
    },
    { sequelize, timestamps: true }
);
