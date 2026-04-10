import Booking from '../models/booking.model.js';

/**
 * Create booking
 */
export const createBooking = async (data) => {
    const { checkIn, checkOut } = data;

    if (new Date(checkOut) <= new Date(checkIn)) {
        throw new Error('Check-out date must be after check-in date');
    }

    // Optional: prevent double booking (date overlap)
    const existingBooking = await Booking.findOne({
        propertyId: data.propertyId,
        status: { $in: ['pending', 'confirmed'] },
        $or: [
            {
                checkIn: { $lt: new Date(checkOut) },
                checkOut: { $gt: new Date(checkIn) },
            },
        ],
    });

    if (existingBooking) {
        throw new Error('Property is already booked for selected dates');
    }

    const booking = await Booking.create(data);

    // Push into property calendar
    property.bookedDates.push({
        checkIn,
        checkOut,
        bookingId: booking._id,
    });

    await property.save();

    return booking;
};

/**
 * Get all bookings
 */
export const getAllBookings = async (filters = {}) => {
    return await Booking.find(filters)
        .populate('userId', 'firstName lastName email')
        .populate('propertyId')
        .sort({ createdAt: -1 });
};

/**
 * Get single booking
 */
export const getBookingById = async (id) => {
    const booking = await Booking.findById(id)
        .populate('userId', 'firstName lastName email')
        .populate('propertyId');

    if (!booking) {
        throw new Error('Booking not found');
    }

    return booking;
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (id, status) => {
    const booking = await Booking.findById(id);

    if (!booking) {
        throw new Error('Booking not found');
    }

    booking.status = status;
    await booking.save();

    return booking;
};

/**
 * Delete booking
 */
export const deleteBooking = async (id) => {
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
        throw new Error('Booking not found');
    }

    return booking;
};