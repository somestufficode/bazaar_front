import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    media: [String],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], 
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
    price: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) } },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

