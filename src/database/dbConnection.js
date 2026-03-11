import mongoose from 'mongoose'
import config from "../config/index.js";

export const connectDB = async () => {
    try {
        if (!config.mongodbUri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose.connect(config.mongodbUri);
        console.log('Connected to MongoDB...');

    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};
export const disconnectDB = async () => {
    await mongoose.disconnect();
}

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB error:', err);
});