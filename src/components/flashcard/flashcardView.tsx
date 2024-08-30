"use client"


import { FlashcardData } from "@/lib/flashcard-types"
import { Button } from "../ui/button"
import FlashcardCardWhole from "./flashcardCardWhole"





export default function FlashcardView({ flashcardData }: {
    flashcardData: FlashcardData
}) {
    return (
        <>
            <FlashcardCardWhole flashcardData={flashcardData}/>

        </>
    )
}