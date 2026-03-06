import crypto from "crypto";
import config from "../config/index.js"
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
import RefreshToken from "../models/refreshToken.model.js"


const generateAccessToken = (userId) => {
    return jwt.sign(
        { userId },
        config.jwt.accessSecret,
        { expiresIn: config.jwt.accessExpiresIn }
    );
};

const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

const register = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
    if (existingUser) {
        throw new AppError('Email already registered', 400);
    }
    const user = await User.create(userData);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken();
    await RefreshToken.create({
        token: refreshToken,
        userId: user._id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return {
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            status: user.status,
            avatar: user.avatar,
        },
        accessToken,
        refreshToken,
        expiresIn: config.jwt.accessExpiresIn,
    };
};


const login = async (email, password) => {
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }
    if (user.status !== 'active') {
        throw new AppError('Your account has been deactivated', 401);
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken();
    await RefreshToken.create({
        token: refreshToken,
        userId: user._id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return {
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            status: user.status,
            avatar: user.avatar,
        },
        accessToken,
        refreshToken,
        expiresIn: config.jwt.accessExpiresIn,
    };
};

const logout = async (refreshToken) => {
    if (refreshToken) {
        await RefreshToken.deleteOne({ token: refreshToken });
    }
    return { message: 'Logged out successfully' };
};

const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new AppError('Refresh token is required', 400);
    }
    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken) {
        throw new AppError('Invalid or expired refresh token', 401);
    }
    if (new Date() > storedToken.expiresAt) {
        await RefreshToken.deleteOne({ token: refreshToken });
        throw new AppError('Refresh token has expired', 401);
    }
    const user = await User.findById(storedToken.userId);
    if (!user || user.status !== 'active') {
        await RefreshToken.deleteOne({ token: refreshToken });
        throw new AppError('User no longer exists or is inactive', 401);
    }
    const accessToken = generateAccessToken(user._id);
    return {
        accessToken,
        expiresIn: config.jwt.accessExpiresIn,
    };
};


export {register, login, logout, refreshAccessToken}