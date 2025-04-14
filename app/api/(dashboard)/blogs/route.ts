import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/lib/models/blog";
import { Types } from "mongoose";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";

export const GET = async (request: Request) => {
    try{
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const categoryId = searchParams.get('categoryId')

        if (!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Invalid or missing user ID"
                }),
                { status: 400 }
            )
        }

        if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Invalid or missing category ID"
                })
            )
        }

        await connect();

        const user = await User.findById(userId);
        if(!user) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "User not found!"
                }),
                { status: 404 }
            )
        }

        const category = await Category.findById(categoryId)
        if(!category) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Category not found"
                }),
                { status: 404 }
            )
        }

        const filter: any = {
            user: new Types.ObjectId(userId),
            category: new Types.ObjectId(categoryId)
        }

        const blogs = await Blog.find(filter);

        return new NextResponse(
            JSON.stringify({ 
                success: true,
                blogs
            }),
            { status: 200 }
        )
    } catch(err: any){
        return new NextResponse(`Error in fetching blogs ${err.message}`, { status: 500 })
    }
}