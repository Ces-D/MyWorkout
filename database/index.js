import { DataTypes } from "sequelize";

import User from "./Users";
import Exercise from "./Exercises";
import Program from "./Programs";
import Workout from "./Workouts";

// TODO: https://sequelize.org/master/manual/assocs.html
// TODO: https://sequelize.org/master/class/lib/associations/base.js~Association.html

User.hasMany(Program, {
    as: "trainer",
    foreignKey: {
        name: "trainerId",
        type: DataTypes.UUID,
        allowNull: false, // every Program must have a trainer aka author
    },
}); // trainers can make many programs
Program.belongsTo(User); // Each program only has one trainer aka author
//
User.hasMany(Workout, {
    as: "trainer",
    foreignKey: {
        name: "trainerId",
        type: DataTypes.UUID,
        allowNull: false, // every workout must have one trainer aka author
    },
}); // trainers can make many workouts
Workout.belongsTo(User); // Each workout only has one trainer aka author
//
Workout.hasMany(Exercise, {
    as: "workout",
    foreignKey: "workoutID",
    type: DataTypes.UUID,
    allowNull: false, // every exercise must be from one workout
}); // Workouts are made up of many exercises
Exercise.belongsTo(Workout); // Each exercise is coming from a single workout
//
Program.belongsToMany(User, {
    through: "ClientToProgram",
    as: "clients",
    foreignKey: "programId",
    otherKey: "clientId",
}); // Many clients can partake in many programs
User.belongsToMany(Program, {
    through: "ClientToProgram",
    as: "programs",
    foreignKey: "clientId",
    otherKey: "programId",
}); // Many programs can be used by many clients

export { User, Exercise, Program, Workout };
