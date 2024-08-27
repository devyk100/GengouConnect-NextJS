import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import Image from "next/image";

import FlashcardDecks, { FlashcardDeckType } from "@/components/flashcard-page/flashcard-decks";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getDecks } from "@/db/get-post-delete-requests";
import FlashcardCards from "@/components/flashcard-page/flashcard-cards";


const demo: FlashcardDeckType[] = [
    {
        id: 1,
        newCards: 2,
        reviewCards: 10,
        title: "Something serious"
    },
    {
        id: 2,
        newCards: 3,
        reviewCards: 11,
        title: "Something else here"
    }
]

export default async function FlashcardPage() {
    const user = await getServerSession(authOptions);
    //@ts-ignore
    const flashcardDeckData = await getDecks({token:user?.user?.backendToken })
    console.log(flashcardDeckData)
    return (
        <>
            <section className="flex flex-row ">
                <div className=" w-[20%] mt-5 h-fit">
                    <ReactQueryProvider>
                        <FlashcardDecks decks={flashcardDeckData} user={user}/>
                    </ReactQueryProvider>
                </div>
                <Separator orientation="vertical" className=""/>
                <div className="flex items-center read-only: justify-center rounded-md p-2 w-full">
                    <FlashcardCards user={user}/>
                </div>
            </section>
        </>
    )
}