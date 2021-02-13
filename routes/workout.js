import { Router } from "express";
import { csurfProtection } from "../lib/security.js";
import { loginRequired } from "../lib/routes/loginHandler.js";

const workoutRouter = Router();

workoutRouter.use(loginRequired);

workoutRouter.use(csurfProtection);

workoutRouter
    .route("/day")
    /**
     * this is the one day view that is the majority of the app
     * should be smart and pre-populate if workout is created for that day
     * or if the user is doing a program
     */
    .get();

workoutRouter.route("/workout/create");
/**
 * create workouts, aka the single page workouts that don't require to be in programs
 */

workoutRouter.route("/workout/:workoutId");

workoutRouter.route("/workout/:workoutId/edit");

workoutRouter.route("/program/create");
/**
 * we create a program
 *
 */

workoutRouter.route("/program/:programId");
/**
 * view of a single program
 * buttons to create program and add to a program should be available
 * clicking create program should send to program/create
 * clicking add to program should go to /workout/create but with add to program option added
 */

workoutRouter.route("/program/:programId/edit");
