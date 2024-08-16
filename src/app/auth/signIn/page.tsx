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
            <button onClick={() => {
                signIn("google")
            }}>
                    Sign in to google
            </button>
            <button onClick={() => {
                signIn("github")
            }}>
                Sign in to Github
            </button>
            <SignInForm />
        </>
    )
}