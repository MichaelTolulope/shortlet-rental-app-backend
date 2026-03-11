import mongoose from 'mongoose'

const propertySchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Property title is required'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        propertyType: {
            type: String,
            required: [true, 'Property type is required'],
            enum: ['apartment', 'house', 'villa', 'cottage', 'hostel', 'other'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
        },
        currency: {
            type: String,
            default: 'USD',
            trim: true,
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true,
        },
        state: {
            type: String,
            required: [true, 'State is required'],
            trim: true,
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
            trim: true,
        },
        location: {
            lat: { type: Number, default: null },
            lng: { type: Number, default: null },
        },
        images: [
            {
                type: String,
                trim: true,
            },
        ],
        amenities: [
            {
                type: String,
                trim: true,
            },
        ],
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        status: {
            type: String,
            enum: ['draft', 'active', 'inactive', 'suspended'],
            default: 'active',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

propertySchema.index({ ownerId: 1 });
propertySchema.index({ agentId: 1 });
propertySchema.index({ city: 1, country: 1 });
propertySchema.index({ status: 1, propertyType: 1 });

export default mongoose.model('Property', propertySchema);
