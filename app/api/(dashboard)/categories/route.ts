import connect from "@/lib/db";
import Category from "@/lib/models/category";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";


export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId');

    if(!userId || !Types.ObjectId.isValid(userId)){
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: "User ID not found or not valid"
            }),
            { status: 400 }
        )
    }

    await connect();
    const user = await User.findById(userId)

    if(!user){ 
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: "User not found!"
            }),
            { status: 404 }
        )
    }

    const categories = await Category.find({ user: new Types.ObjectId(userId) })

    return new NextResponse(
        JSON.stringify(categories),
        { status: 200 }
    )

    } catch (error: any) {
        return new NextResponse(`Error in creating category ${error.message}`, { status: 500 })
    }

}

export const POST = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId');

        const { title } = await request.json()

        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "User ID not found or not valid"
                }),
                { status: 400 }
            )
        }
        await connect();
        const user = await User.findById(userId)

        if(!user){ 
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "User not found!"
                }),
                { status: 404 }
            )
        }

        const newCategory = new Category({
            title,
            user: new Types.ObjectId(userId)
        })

        await newCategory.save()

        return new NextResponse(
            JSON.stringify({
                success: true,
                message: "Category created successfully!",
                category: {
                    title: newCategory.title,
                    user: newCategory.user
                }
            }),
            { status: 200 }
        )
    } catch (error: any){
        return new NextResponse(`Error in creating a new category ${error.message}`, { status: 500 })
    }
}