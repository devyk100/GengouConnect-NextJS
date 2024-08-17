"use server"

import prisma from "@/db"
import bcrypt from "bcrypt"

export async function hashPassword(password: string){
    return bcrypt.hashSync(password, 10)
}

export async function compareHash(password: string, hash: string){
    return bcrypt.compareSync(password, hash)
}

export async function test(){
    const user = await prisma.user.findUnique({
        where: {
            email_id: "devyk100@gmail.com"
        }
    })
    return user
}
