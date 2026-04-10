import express from "express";
import {protect, restrictTo} from "../middleware/auth.js";
import {getProfile} from "../controllers/user.controller.js";


const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve user information
 *     responses:
 *       200:
 *         description: User profile information
 */
router.get("/profile", protect, getProfile);

router.get("/", protect, (req,res) => {
    res.send({"message":"user-route"})

})

export default router;