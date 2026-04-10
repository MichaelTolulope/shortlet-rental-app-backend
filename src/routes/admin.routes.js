import express from "express";

const router = express.Router();


/**
 * @swagger
 * /admin:
 *   get:
 *     summary: default admin route
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: admin route health check
 */
router.get("/", (req, res) => {
    res.status(200).send({"message": "admin routes"});
})


export default router;