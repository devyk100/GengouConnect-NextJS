"use client"
import { SignInForm } from "@/components/signInForm"
import { getSession, signIn, useSession } from "next-auth/react"
import { useEffect } from "react"

export default function SignIn(){
    console.log("Entering the sigin page by the server")
    useEffect(() => {
        (async function(){
            const session = await getSession();
            console.log(session)
        })()
    }, [])
    return (
        <>

        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-tr from-blue-700 to-green-800">
            <SignInForm />
        </div>
        </>
    )
}