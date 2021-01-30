import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config";

export default class Workout extends Model {
    getWorkoutLength() {
        // assuming they are updating their workouts as they go
        // the time a session is created should differ from the last time it was updated at
        return sessionEnd - sessionStart;
    }
}
Workout.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        // Program this workout is a part of
        // optional
        programName: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        // Date the workout is suppose to be had
        sessionDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        // actual start of workout
        sessionStart: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        // actual end fo workout
        sessionEnd: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        // Person having workout
        trainer: {
            type: DataTypes.INTEGER,
            references: { model: User, key: "id" },
        },
        // Goal of the exercises in gym session
        goal: {
            type: DataTypes.STRING(1234),
            allowNull: true,
        },
        // Any notes regarding the workouts or gym session
        notes: {
            type: DataTypes.STRING(1234),
            allowNull: true,
        },
    },
    { sequelize, timestamps: true }
);
