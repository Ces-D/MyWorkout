import { Router } from "express";
import { User } from "../database/index.js";
const adminRouter = Router();

adminRouter.route("/all").get(async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(JSON.stringify(users, null, 2));
    } catch (error) {
        res.json({ error: error.message });
    }
});

export default adminRouter;
