import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import configVariables from "../config/index.js";

const protect = async (req, res, next) => {
    try {
        let token;

        // Check for Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        try {
            const decoded = jwt.verify(token, configVariables.jwt.accessSecret);
            console.log("decoded:",decoded);

            const user = await User.findById(decoded.userId);

            if (!user) {
                return res.status(401).json({ error: 'User no longer exists.' });
            }

            if (user.status !== 'active') {
                return res.status(401).json({ error: 'Your account has been deactivated.' });
            }

            req.user = user;
            next();

        } catch (err) {
            console.log(err)
            return res.status(401).json({ error: "Invalid or expired token" });
        }

    } catch (error) {
        next(error);
    }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'You do not have permission to perform this action.'
            });
        }
        next();
    };
};

export { protect, restrictTo };