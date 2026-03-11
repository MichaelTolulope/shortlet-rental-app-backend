import express  from "express";
import {
    createProperty,
    getOneByPropertyId,
    getProperties,
    updateOneProperty
} from "../controllers/properties.controller.js";
import {deleteProperty} from "../services/property.service.js";
import {protect, restrictTo} from "../middleware/auth.js";

const router = express.Router();

router.get('/all', getProperties);
router.get('/:id', getOneByPropertyId);
router.post('/',protect, restrictTo('admin'), createProperty);
router.put('/:id',protect, restrictTo('admin'), updateOneProperty);
router.delete('/:id',protect, restrictTo('admin'), deleteProperty);

export default router;