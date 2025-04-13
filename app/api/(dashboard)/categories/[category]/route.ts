import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const PATCH = async (request: Request, context: { params: any }) => {
    const categoryId = await context.params.category;
    try {
        const body = await request.json();
        const { title } = body;

        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId');

        if(!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Invalid or missing user ID"
                }),
                { status: 400 }
            )
        }

        if(!categoryId || !Types.ObjectId.isValid(categoryId)) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Invalid or missing category"
                }),
                { status: 400 }
            )
        }
        await connect();

        const user = await User.findById(userId);
        if (!user){
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "User not found!"
                }),
                { status: 404 }
            )
        }

        const category = await Category.findOne({ _id: categoryId, user: userId });
        if (!category) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Category is not found!"
                }),
                { status: 404 }
            )
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { title },
            { new: true }
        )

        return new NextResponse(
            JSON.stringify({
                success: true,
                message: "Category is updated",
                category: updatedCategory,
            }),
            { status: 200 }
        )
    } catch (err: any) {
        return new NextResponse(`Error i updating category ${err.message}`, { status: 500 })
    }
}

export const DELETE = async (request: Request, context: { params: any }) => {
    const categoryId = await context.params.category;
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId')

        if (!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Invalid or missing user Id"
                }),
                { status: 404 }
            )
        }

        if (!categoryId || !Types.ObjectId.isValid(categoryId)){
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Invalid of missing category Id"
                }),
                { status: 400 }
            )
        }
        await connect();

        const user = await User.findById(userId);
        
        if(!user){
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "User not found!"
                }),
                { status: 404 }
            )
        }
        const category = await Category.findOne({ _id: categoryId, user: userId })
        if (!category){
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Category not found!"
                }),
                { status: 404 }
            )
        }

        await Category.findByIdAndDelete(categoryId)

        return new NextResponse(
            JSON.stringify({
                success: true,
                message: "Category is deleted successfully!"
            }),
            { status: 200 }
        )
    } catch (err: any){
        return new NextResponse(`Error in deleting category ${err.message}`, { status: 500 })
    }
}