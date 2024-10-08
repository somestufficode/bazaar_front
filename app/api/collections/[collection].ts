import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Collection from '@/lib/models/Collection';

export const GET = async (req: NextRequest) => {
    const segments = req.nextUrl.pathname.split('/').filter(Boolean);
    const category = segments[segments.length - 1];  // Extract the dynamic category (women, men, etc.)
    console.log('cate:', category)
    console.log('seg:', segments)

    try {
        await connectToDB();

        let query = {};
        // Ensure valid category or handle "all" to fetch everything
        if (category !== 'all' && ['women', 'men', 'baby', 'girls', 'boys'].includes(category.toLowerCase())) {
            query = { category: { $regex: new RegExp(category, 'i') } };  // Case-insensitive match for the category
        }

        const collections = await Collection.find(query).sort({ createdAt: "desc" });

        return NextResponse.json(collections, { status: 200 });
    } catch (err) {
        console.error(`[collections_GET_${category}]`, err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
