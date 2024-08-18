import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { MouseEventHandler } from "react";

export enum FlashcardButtonType {
    again = "Again",
    hard = "Hard",
    good = "Good",
    easy = "Easy",
    showAnswer = "Show Answer"
}

export function FlashcardButton({ type, time, onClick }: {
    type: FlashcardButtonType,
    time: string,
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}) {
    const textStyle = (type == FlashcardButtonType.again ? "text-red-500" : (type == FlashcardButtonType.easy) ? "text-blue-500" : (type == FlashcardButtonType.good) ? "text-green-500" : (type == FlashcardButtonType.hard) ? "text-zinc-500" : "");
    return (
        <>
            <span className="flex flex-col w-full">
                <Button onClick={onClick} className={cn("text-md md:text-lg", textStyle)} variant="outline">
                    {
                        type
                    }
                </Button>
                <span className={cn("text-[10px] sm:text-sm w-full text-center", textStyle)}>
                    {time}
                </span>
            </span>
        </>
    )
} 