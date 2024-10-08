// models/Category.js
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true }, // Category name (e.g., 'Shirts', 'Pants')
  description: { type: String }, // Optional description for the category
  collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }, // Reference to the parent collection
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Array of product references
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
