// pages/api/collections/[collectionSlug]/categories/[categorySlug].js
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import Category from '@/lib/models/Category';

export const GET = async (req: NextRequest) => {
    const { pathname } = req.nextUrl;
  const segments = pathname.split('/').filter(Boolean);

  const categorySlug = segments[4]; // Assuming [categorySlug] is the fourth segment

  // Log the slug and converted title for debugging
  console.log("Category Slug:", categorySlug);

  const categoryTitle = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  console.log("Converted Title for Query:", categoryTitle);  // Log the title you're querying for

  try {
    await connectToDB();

    // Find the category and populate the 'products' field
    const category = await Category.findOne({
      title: { $regex: `^${categoryTitle}$`, $options: 'i' },  // Case-insensitive match
    })
      .populate('products')
      .lean();

    console.log("Category Found:", category);  // Log the result to see if the query finds it

    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.error(`[category_GET_${categorySlug}]`, err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};