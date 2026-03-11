import {createProperty,getAllProperties,updateProperty,deleteProperty,getPropertyById,isPropertyOwner} from '../services/property.service.js'

const createNewProperty = async (req, res, next) => {
    try {
        const property = await createProperty(req.user._id, req.body);
        res.status(201).json({
            status: 'success',
            data: { property },
        });
    } catch (error) {
        next(error);
    }
};

const getProperties = async (req, res, next) => {
    try {
        const result = await getAllProperties(req.query);
        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getOneByPropertyId = async (req, res, next) => {
    try {
        const property = await getPropertyById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { property },
        });
    } catch (error) {
        next(error);
    }
};

const updateOneProperty = async (req, res, next) => {
    try {
        const isAdmin = req.user.role === 'admin';
        const property = await updateProperty(req.user._id, req.params.id, req.body, isAdmin);
        res.status(200).json({
            status: 'success',
            data: { property },
        });
    } catch (error) {
        next(error);
    }
};

const deleteOneProperty = async (req, res, next) => {
    try {
        const isAdmin = req.user.role === 'admin';
        await deleteProperty(req.user._id, req.params.id, isAdmin);
        res.status(200).json({
            status: 'success',
            message: 'Property deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};


export {
    getOneByPropertyId,
    deleteOneProperty,
    getProperties,
    updateOneProperty,
    createProperty
}