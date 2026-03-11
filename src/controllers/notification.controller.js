import Notification from '../models/notification.model.js'
import {markAsRead, getNotifications} from "../services/notification.service.js";

const getMyNotifications = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const query = req.query;

        const result = await getNotifications(userId, query);

        const total = await Notification.countDocuments(filter);
        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const markNotificationAsRead = async (req, res) => {
    try {
        const userId = req.user._id;
        const notificationId = req.params.id
        const notification = await markAsRead(notificationId,userId);
        res.status(200).json({
            status: 'success',
            data: { notification },
        });
    } catch (error) {
        console.error(error);
    }
};


export {
    getMyNotifications,
    markNotificationAsRead,
};
