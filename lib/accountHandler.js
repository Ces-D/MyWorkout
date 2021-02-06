import { User } from "../database/index.js";

export const loadAccount = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user },
        });
        const workouts = "workouts"
        const programs = "programs"

        res.render("account", {
            pageTitle: "Account",
            userName: user.userName,
        });
    } catch (error) {
        next(error);
    }
};
