import express from "express";
import {protect} from "../middleware/auth.js";


const router = express.Router();


router.get("/", protect, (req, res) => {
    res.status(200).send({"message": "user routes"});
})

export default router;