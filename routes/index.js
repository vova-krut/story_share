import { Router } from "express";
import { ensureAuth, ensureGuest } from "../middleware/auth.js";
import Story from "../models/Story.js";

const router = Router();

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
    res.render("login", {
        layout: "login",
    });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user._id }).lean();
        res.render("dashboard", {
            name: req.user.displayName,
            stories,
        });
    } catch (e) {
        console.error(e);
        res.render("error/500");
    }
});

export default router;
