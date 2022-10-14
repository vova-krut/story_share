import { Router } from "express";
import Story from "../models/Story.js";
import { ensureAuth } from "../middleware/auth.js";

const router = new Router();

// @desc    Show add page
// @route   GET /stories/add
router.get("/add", ensureAuth, (req, res) => {
    res.render("stories/add");
});

// @desc    Process add form
// @route   POST /stories
router.post("/", ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user._id;
        await Story.create(req.body);
        res.redirect("/dashboard");
        console.log(req.body);
    } catch (e) {
        console.error(e);
        res.render("error/500");
    }
});

export default router;
