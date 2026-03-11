import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

const getMe = async (userId) => {
    const user = await User.findById(userId).select('-__v');
    if (!user) {
        throw new AppError('User not found');
    }
    return user;
}

export {getMe}