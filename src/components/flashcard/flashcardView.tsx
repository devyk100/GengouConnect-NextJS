"use client"


import { FlashcardData } from "@/lib/flashcard-types"
import { Button } from "../ui/button"
import FlashcardCardWhole from "./flashcardCardWhole"





export default function FlashcardView({ flashcardData }: {
    flashcardData: FlashcardData
}) {

    return (
        <>
            <div className="w-full flex justify-end">
                <Button variant={"outline"} className="m-2">Add Card</Button>
            </div>
            <FlashcardCardWhole flashcardData={flashcardData}/>

        </>
    )
}