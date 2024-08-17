"use server"

import { User } from "@prisma/client";
import prisma from "./index"
import { hashPassword } from "@/lib/password-hashing";

export async function createUser(userId: string, name: string, user_type: "Instructor" | "Learner", email: string, phone: string, password: string): Promise<boolean> {
    try{
        await prisma.user.findFirstOrThrow({
            where: {
                email_id: email,
                user_type: user_type,
                register_method: "Email"
            }
        })
        return false
    } catch(error){
        
    }
    try {
        const userData = await prisma.user.create({
            data: {
                email_id: email,
                is_password_set: true,
                is_phone_set: true,
                is_user_id_set: true,
                is_verified: false,
                name: name,
                password: await hashPassword(password),
                phone: phone,
                profile_picture: "",
                register_method: "Email",
                user_id: userId,
                user_type: user_type,
            }
        })
        return true;
    } catch (error) {
        console.log(error)
        return false
    }
}