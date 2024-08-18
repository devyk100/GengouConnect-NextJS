"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FlashcardData } from "@/lib/flashcard-types"
import { Button } from "./ui/button"
import { FlashcardButton, FlashcardButtonType } from "./flashcardButton"


export default function FlashcardView() {
    const demo: FlashcardData = {
        backSide: `*Something cool huh*\n*Something other cool*\n<p>Other stuff</p>\nstuff are cool`,
        frontSide: `*Some kind of clue and more here*\nSomething better`
    }
    return (
        <>
            <Card className="w-[400px] p-4">
                <CardContent>

                    <p>{demo.backSide}</p><p>{demo.frontSide}</p>
                </CardContent>
                <CardFooter>
                    <div className="flex">
                        <FlashcardButton time="something" type={FlashcardButtonType.again}></FlashcardButton>
                        <FlashcardButton time="something" type={FlashcardButtonType.hard}></FlashcardButton>
                        <FlashcardButton time="something" type={FlashcardButtonType.good}></FlashcardButton>
                        <FlashcardButton time="something" type={FlashcardButtonType.easy}></FlashcardButton>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}