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
import NotFound from "../not-found";
import FlashcardDeckMenu from "@/components/flashcard/flashcardDeckMenu";
import FCMenu from "@/components/flashcard/menu";


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
    try {
        const user = await getServerSession(authOptions);
        console.log(user?.user)
        //@ts-ignore
        const flashcardDeckData = await getDecks({ token: user?.user?.backendToken })
        return (
            <>
                <section className="flex flex-row  relative h-screen overflow-x-hidden">
                    <FCMenu />
                    <FlashcardDeckMenu flashcardDeckData={flashcardDeckData} user={user} />
                    <Separator orientation="vertical" className="" />
                    <FlashcardCards user={user} />
                </section>
            </>
        )
    }
    catch (error) {
        return (<>
            <NotFound />
        </>)
    }
}