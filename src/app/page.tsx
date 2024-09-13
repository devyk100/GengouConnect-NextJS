import prisma from "@/db";
import { getSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export const runtime = "edge";

export default async function Home() {
  return (
   <>
  something
   </>
  );
}
