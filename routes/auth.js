import { Router } from "express";
import passport from "passport";
const router = Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
        successRedirect: "/dashboard",
    })
);

export default router;
