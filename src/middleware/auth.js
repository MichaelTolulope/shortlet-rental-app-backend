import jwt from 'jsonwebtoken';
import config from '../config/index.js'
import User from '../models/user.model.js'


const protect = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            return next(new Error('You are not logged in. Please log in.', 401));
        }

        const decoded = jwt.verify(token, config.jwt.accessSecret);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return next(new Error('User no longer exists.', 401));
        }
        if (user.status !== 'active') {
            return next(new Error('Your account has been deactivated.', 401));
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return next(new Error('Invalid or expired token.', 401));
        }
        next(error);
    }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new Error('You do not have permission to perform this action.', 403));
        }
        next();
    };
};

export { protect, restrictTo };