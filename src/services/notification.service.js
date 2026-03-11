import Notification from '../models/notification.model.js';

const getNotifications = async (userId, query = {}) => {
    const { page = 1, limit = 20, read } = query;
    const filter = { userId };
    if (read !== undefined) filter.read = read === 'true';

    const notifications = await Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit, 10));

    const total = await Notification.countDocuments(filter);
    return { notifications, total, page: parseInt(page, 10), limit: parseInt(limit, 10) };
};

const markAsRead = async (notificationId, userId) => {
    const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, userId },
        { read: true },
        { new: true }
    );
    if (!notification) {
        throw new Error('Notification not found');
    }
    return notification;
};

export {
    getNotifications,
    markAsRead,
};
