import * as bookingService from '../services/bookings.service.js';

/**
 * Create booking
 */
export const createBooking = async (req, res) => {
    try {

        const booking = await bookingService.createBooking({
            ...req.body,
            userId: req.user.id, // assuming auth middleware
        });

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: booking,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Get all bookings
 */
export const getBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();

        res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Get single booking
 */
export const getBooking = async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);

        res.status(200).json({
            success: true,
            data: booking,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const booking = await bookingService.updateBookingStatus(
            req.params.id,
            status
        );

        res.status(200).json({
            success: true,
            message: 'Booking updated successfully',
            data: booking,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Delete booking
 */
export const deleteBooking = async (req, res) => {
    try {
        await bookingService.deleteBooking(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully',
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};