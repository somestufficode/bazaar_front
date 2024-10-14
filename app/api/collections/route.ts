// pages/api/collections/index.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import Collection from '@/lib/models/Collection';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();  // Ensure database connection is established

    // Fetch all collections without populating categories
    const collections = await Collection.find({}).lean();

    return NextResponse.json(collections, { status: 200 });
  } catch (err) {
    console.error(`[collections_GET]`, err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
