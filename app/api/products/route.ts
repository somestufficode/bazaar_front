// import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB();

        const { 
            title, description, media, category, collections, price, 
        } = await req.json();

        if (!title || !description || !category || !price ) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create the new product
        const newProduct = new Product({
            title,
            description,
            media,
            category,
            collections,
            price,
        });

        await newProduct.save();

        // If collections were provided, update those collections
        if (collections && collections.length > 0) {
            for (const collectionId of collections) {
                const collection = await Collection.findById(collectionId);
                if (collection) {
                    collection.products.push(newProduct._id);
                    await collection.save();
                }
            }
        }

        return NextResponse.json(newProduct, { status: 200 });
    } catch (error) {
        console.error("Error in creating product:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};


export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const products = await Product.find()
            .sort({ createdAt: "desc" })
            .populate({ path: "collections", model: Collection });

        return NextResponse.json(products, { status: 200 });
    } catch (err) {
        console.log("[products_GET]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

export const dynamic = "force-dynamic";
