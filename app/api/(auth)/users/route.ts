import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import bcrypt from 'bcrypt'

export const GET = async () => {
    try {
        await connect();
        const users = await User.find()
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (err: any){
        return new NextResponse(`Error in fetching users ${err.message}`, {status: 500})
    }
}

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const { email, username, password } = body;
        
        if (!email || !username || !password) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Name, username, and password are required."
                }),
                { status: 400 }
            )
        }

        await connect();

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            username,
            password: hashedPassword
        })
        await newUser.save();

        return new NextResponse(JSON.stringify({
            success: true,
            message: "User is created!",
            user: {
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username
            }
        }), {
            status: 200
        })
    } catch (err: any) {
        return new NextResponse(`Error in creating user ${err.message}`, {
            status: 500
        })
    }
}

export const PATCH = async (request: Request) => {
    try {
        const body = await request.json();
        const { userId, newUsername } = body;
        await connect();
        
        if(!userId || !newUsername){
            return new NextResponse(
                JSON.stringify({ 
                    success: false,
                    message: "ID or new username not found!"
                 }), { status: 400 }
            );
        }
        
        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({ 
                    success: false,
                    message: "Invalid User ID!"
                 }), { status: 400 }
            );
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username: newUsername },
            { new: true }
        )

        if (!updatedUser) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "User not found!",
                }),
                { status: 404 }
            )
        }

        return new NextResponse(
            JSON.stringify({
                success: true,
                message: "User is updated",
                user: updatedUser
            }),
            { status: 200 }
        )
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: `Error updating user: ${ error.message }`
            }),
            { status: 500 }
        )
    }
}

export const DELETE = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId){
            return new NextResponse(
                JSON.stringify({ message: "ID not found!" }),
                { status: 400 }
            )
        }

        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid user id" })
            ),
            { status: 400 }
        }

        await connect();

        const deletedUser = await User.findByIdAndDelete(
            new Types.ObjectId(userId)
        )

        if (!deletedUser) {
            return new NextResponse(
                JSON.stringify({ message: "User not found is the database" }),
                { status: 404 }
            )
        }

        return new NextResponse(
            JSON.stringify({ 
                success: true,
                message: "User is deleted",
                user: deletedUser
             }),
             { status: 200 }
        )
    } catch (err: any){
        return new NextResponse(`Error in deleting user ${err.message}`),
        { status: 500 }
    }
}