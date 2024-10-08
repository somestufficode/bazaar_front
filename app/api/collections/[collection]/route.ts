// pages/api/collections/[collection].js
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Collection from '@/lib/models/Collection';
import { NextRequest } from 'next/server';
import Product from '@/lib/models/Product'; // Ensure Product is imported

export const GET = async (req: NextRequest) => {
  const segments = req.nextUrl.pathname.split('/').filter(Boolean);
  const collectionSlug = segments[segments.length - 1]; // Extract the collection slug

  try {
    await connectToDB(); // Ensure database connection is established

    // Find the collection and populate the products field with full details
    const collection = await Collection.findOne({ title: { $regex: `^${collectionSlug}$`, $options: 'i' } }).populate('products').lean(); 

    console.log('Fetched Collection:', collection);

    if (!collection) {
      return NextResponse.json({ message: 'Collection not found' }, { status: 404 });
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.error(`[collections_GET_${collectionSlug}]`, err);
    return NextResponse.json({ message: 'Internal Server Error'}, { status: 500 });
  }
};
