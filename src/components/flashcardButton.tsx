import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export enum FlashcardButtonType {
    again = "Again",
    hard = "Hard",
    good = "Good",
    easy = "easy"
}

export function FlashcardButton({ type, time }: {
    type: FlashcardButtonType,
    time: string
}) {
    const textStyle = (type == FlashcardButtonType.again ? "text-red-500" : (type == FlashcardButtonType.easy) ? "text-blue-500" : (type == FlashcardButtonType.good) ? "text-green-500" : "text-zinc-500");
    return (
        <>
            <span className="flex flex-col mr-1">
                <Button className={cn("text-lg", textStyle)} variant="outline">
                    {
                        (type == FlashcardButtonType.again) ? "Again" : (type == FlashcardButtonType.easy) ? "Easy" : (type == FlashcardButtonType.good) ? "Good" : "Hard"
                    }
                </Button>
                <span className={cn("text-sm", textStyle)}>
                    {time}
                </span>
            </span>
        </>
    )
} 