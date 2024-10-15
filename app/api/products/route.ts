import { NextResponse, NextRequest } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import Category from '@/lib/models/Category';
import Product from '@/lib/models/Product';

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();  // Ensure the database connection is established

    // Fetch all categories
    const categories = await Category.find({}).lean();

    // Initialize an array to hold all products from all categories
    let allProducts = [];

    // Iterate through each category and fetch its products
    for (const category of categories) {
      const products = await Product.find({ _id: { $in: category.products } }).lean();

      // Push all the products from this category into the allProducts array
      allProducts.push(...products);
    }

    // Return the aggregated list of products
    return NextResponse.json(allProducts, { status: 200 });
  } catch (err) {
    console.error(`[categories_GET]`, err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

export const dynamic = "force-dynamic";
