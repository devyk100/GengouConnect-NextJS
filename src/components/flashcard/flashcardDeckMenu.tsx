"use client"
import { Session } from "next-auth";
import FlashcardDecks, { FlashcardDeckType } from "../flashcard-page/flashcard-decks";
import ReactQueryProvider from "../providers/react-query-provider";
import { Button } from "../ui/button";
import Image from "next/image";
import DeckIcon from "../../../public/deck.svg"
import { useDeckMenuState } from "@/state/store";
import { cn } from "@/lib/utils";

export default function FlashcardDeckMenu({ flashcardDeckData, user }: {
    flashcardDeckData: FlashcardDeckType[];
    user: Session | null;
}) {
    const { isDeckMenuOpen, setDeckMenuOpen } = useDeckMenuState()
    return (
        <>
            <Button className=" absolute top-0 left-0 m-1   " variant={"icon-button"} onClick={(event) => {
                setDeckMenuOpen(!isDeckMenuOpen)
            }}>
                <Image src={DeckIcon} className="h-[20px] w-[20px]" layout="col" width={100} height={100} alt="Something" />
            </Button>
            <div className={cn("mt-10 h-fit flex ml-1 flex-col transition-all md:top-0 left-0 duration-300 md:min-w-[320px] md:translate-x-0", (isDeckMenuOpen ? " translate-x-0 min-w-[98vw]" : "-translate-x-[200vw] min-w-0"))}>
                <ReactQueryProvider>
                    <FlashcardDecks decks={flashcardDeckData} user={user} />
                </ReactQueryProvider>
            </div>
        </>
    )
}