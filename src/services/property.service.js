import Property from '../models/property.model.js'
import AppError from "../utils/AppError.js";


const createProperty = async (userId, propertyData, agentId = null) => {
    const property = await Property.create({
        ownerId: userId,
        agentId: agentId || null,
        ...propertyData,
    });
    return property.populate('ownerId', 'firstName lastName email').populate('agentId');
};

const getAllProperties = async (query = {}) => {
    const { page = 1, limit = 20, status = 'active', city, country, propertyType } = query;
    const filter = { status };
    if (city) filter.city = new RegExp(city, 'i');
    if (country) filter.country = new RegExp(country, 'i');
    if (propertyType) filter.propertyType = propertyType;

    const properties = await Property.find(filter)
        .populate('ownerId', 'firstName lastName email')
        .populate('agentId')
        .skip((page - 1) * limit)
        .limit(parseInt(limit, 10))
        .sort({ createdAt: -1 });

    const total = await Property.countDocuments(filter);
    return { properties, total, page: parseInt(page, 10), limit: parseInt(limit, 10) };
};

const getPropertyById = async (propertyId) => {
    const property = await Property.findById(propertyId)
        .populate('ownerId', 'firstName lastName email')
    if (!property) {
        throw new AppError('Property not found', 404);
    }
    return property;
};

const updateProperty = async (userId, propertyId, updateData) => {
    const property = await Property.findOneAndUpdate({ _id: propertyId }, { $set: updateData }, { new: true, runValidators: true })
        .populate('ownerId', 'firstName lastName email')
    if (!property) {
        throw new AppError('Property not found', 404);
    }
    return property;
};

const deleteProperty = async (userId, propertyId) => {
    const property = await Property.findOneAndDelete({ _id: propertyId });
    if (!property) {
        throw new AppError('Property not found', 404);
    }
    return property;
};

const isPropertyOwner = async (userId, propertyId) => {
    const property = await Property.findById(propertyId);
    if (!property) return false;
    return property.ownerId.toString() === userId.toString();

};

export {
    createProperty,
    getAllProperties,
    isPropertyOwner,
    deleteProperty,
    updateProperty,
    getPropertyById,
}