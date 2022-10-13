import { Router } from "express";
import { ensureAuth, ensureGuest } from "../middleware/auth.js";
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
router.get("/dashboard", ensureAuth, (req, res) => {
    res.render("dashboard");
});

export default router;
