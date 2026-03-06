import {register,login, logout, refreshAccessToken} from '../services/auth.service.js';

const registerUser=async (req, res) => {
    try{
        const result = await register(req.body);
        res.status(201).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        console.error(error);
    }

}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        console.error(error);
    }
};

const logoutUser = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken || req.cookies?.refreshToken;
        await logout(refreshToken);
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully',
        });
    } catch (error) {
        console.error(error);
    }
};

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const result = await refreshAccessToken(refreshToken);
        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        console.error(error);
    }
};


export {
    registerUser,
    loginUser as login,
    logoutUser as logout,
    refreshToken,
}