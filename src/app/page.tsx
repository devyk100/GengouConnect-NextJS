"use client"
import { getSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default async function Home() {
  useEffect(() => {
    (async function() {
      const session = await getSession()
      console.log(session)
    })()
  })
  return (
   <>
   <button onClick={() => {
    signIn()
    // signIn("google")
   }}>
      something inside to sign in
   </button>
   <button onClick={() => {
    signOut()
   }}>
    Sign out dude
   </button>
    Something over here
   </>
  );
}
