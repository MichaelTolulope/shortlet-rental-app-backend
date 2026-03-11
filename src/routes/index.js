import express from 'express'
import adminRoutes from "./admin.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import propertyRoutes from "./property.routes.js";

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/property', propertyRoutes);

export default router;