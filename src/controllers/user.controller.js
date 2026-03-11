import {getMe} from '../services/user.service.js';

const getProfile = async (req, res) => {
    try{
        const userId = req.user._id;
        const userProfile = await getMe(userId);

        res.status(200).json({
            status: 'success',
            data: userProfile,
        })
    }catch (error){
        console.error(error);
    }
}

export {getProfile}