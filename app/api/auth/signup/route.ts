import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { z } from "zod";

const userSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').min(6, 'Password must have atleast 6 characters'),
    username: z.string().min(1, 'Name is required').max(100)
})

// Sign up endpoint
export async function POST(req: NextRequest) {
    const body = await req.json();

    const user = userSchema.parse(body);

    try {
        if (!user || !user.email || !user.password || !user.username) {
            return NextResponse.json({
                message: "Invalid credentials"
            })
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                email: user.email
            }
        })

        if (existingUser) {
            return NextResponse.json({
                message: "User already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
                username: user.username
            }
        })

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({
            user: rest,
            message: "User signed up successfully."
        })
    }
    catch (error) {
        return NextResponse.json({
            message: "Something went wrong."
        }, {
            status: 500
        })
    }

}