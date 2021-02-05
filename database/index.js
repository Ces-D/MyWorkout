import { User } from "./Users.js";
import { Exercise } from "./Exercises.js";
import { Program } from "./Programs.js";
import { Workout } from "./Workouts.js";

/* User to Program  ~ One-To-Many */
User.hasMany(Program, {
    // authors can make many Programs
    as: "programAuthor",
    foreignKey: { allowNull: false }, // programs must have an author
});
Program.belongsTo(User); // Each program can only have one author

/* User to Workout ~ One-To-Many */
User.hasMany(Workout, {
    as: "workoutAuthor",
    foreignKey: { allowNull: false }, // workouts must have an author
}); // trainers can make many workouts
Workout.belongsTo(User); // Each workout only has an author

/* Program to Workout ~ One-To-Many */
Program.hasMany(Workout, {
    // Programs can be empty, however ideally they have workouts
    as: "program",
});
Workout.belongsTo(Program); // each workout belongs to only one Program

/* Workout to Exercise ~ One-To-Many */
Workout.hasMany(Exercise, {
    // Workouts must be made of many exercises
    as: "workout",
});
Exercise.belongsTo(Workout); // Each exercise is coming from a single workout

/* Program to User ~ Many-To-Many */
Program.belongsToMany(User, {
    // Many clients can partake in many programs
    through: "Client_To_Program",
});
User.belongsToMany(Program, {
    through: "Client_To_Program",
}); // Many programs can be used by many clients

export { User, Exercise, Program, Workout };
