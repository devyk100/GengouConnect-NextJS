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
import { Button } from "../ui/button"
import { FlashcardButton, FlashcardButtonType } from "./flashcardButton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

import backSvg from "../../../public/undo.svg"
import Image from "next/image"
import FlashcardContent from "./flashcardContent"




export default function FlashcardView({ flashcardData }: {
    flashcardData: FlashcardData
}) {
    const [isFlipped, setIsFlipped] = useState(false)
    return (
        <>
            <div className="flex w-screen h-screen items-center justify-center overflow-x-hidden p-0 m-0">
                <Card className="overflow-x-hidden -mt-28 w-[400px] sm:w-[450px] md:w-[500px]">
                    {/* <div className="h-[600px] overflow-y-scroll"> */}
                    <ScrollArea className="h-[540px] rounded-md p-0 pt-3 pb-5 w-full">
                        <CardHeader className="">
                            <CardTitle className="text-center text-lg flex w-full justify-between relative">
                               {isFlipped?
                                 <Button className="absolute rounded-full w-[55px] flex h-[55px] top-0 left-0 -m-3" variant="secondary" onClick={() => {
                                    setIsFlipped(false)
                                }}>
                                    <Image alt="back" src={backSvg} className="h-[55px] w-[55px]" />
                                </Button>: null
                               }
                                <span className="w-full">
                                    Some random title
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <FlashcardContent flashcardData={flashcardData} isFlipped={isFlipped} />
                    </ScrollArea>
                    {/* </div> */}
                    <CardFooter>
                        <div className="flex w-full justify-between p-0 -m-2 sm:m-0">
                            {
                                !isFlipped ? <>
                                    <FlashcardButton time="" type={FlashcardButtonType.showAnswer} onClick={(event) => {
                                        setIsFlipped(!isFlipped);
                                    }}></FlashcardButton>
                                </> : <>
                                    <FlashcardButton time="something" type={FlashcardButtonType.again}></FlashcardButton>
                                    <FlashcardButton time="something" type={FlashcardButtonType.hard}></FlashcardButton>
                                    <FlashcardButton time="something" type={FlashcardButtonType.good}></FlashcardButton>
                                    <FlashcardButton time="something" type={FlashcardButtonType.easy}></FlashcardButton>
                                </>
                            }
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}