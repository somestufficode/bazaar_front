import mongoose from "mongoose";
import Category from "./Category";

// cant use quotation for Category.. have to explicitly import Category Schema.. or it's not recognized

const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    categories: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: Category, 
        }
    ], 
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.models.Collection || mongoose.model('Collection', collectionSchema);
