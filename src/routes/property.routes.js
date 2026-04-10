/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property management endpoints
 */

import express from 'express';
import * as propertyController from '../controllers/properties.controller.js';
import { protect } from '../middleware/auth.js';
import {getUnavailableDates} from "../services/property.service.js";

const router = express.Router();

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - propertyType
 *               - price
 *               - city
 *               - state
 *               - country
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               propertyType:
 *                 type: string
 *                 enum: [apartment, house, villa, cottage, hostel, other]
 *               price:
 *                 type: number
 *               currency:
 *                 type: string
 *                 example: USD
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 */
router.post('/', protect, propertyController.createProperty);

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: propertyType
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 */
router.get('/', propertyController.getProperties);

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get a single property
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', propertyController.getOneByPropertyId);

/**
 * @swagger
 * /properties/{id}:
 *   patch:
 *     summary: Update a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.patch('/:id', protect, propertyController.updateOneProperty);

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete('/:id', protect, propertyController.deletePropertyById);

/**
 * @swagger
 * /properties/{id}/unavailable-dates:
 *   get:
 *     summary: Get unavailable booking dates for a property
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of unavailable date ranges
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       checkIn:
 *                         type: string
 *                         format: date
 *                       checkOut:
 *                         type: string
 *                         format: date
 */
router.get('/:id/unavailable-dates', propertyController.getUnavailableDates);

export default router;