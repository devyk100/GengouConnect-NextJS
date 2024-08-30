"use client"
import { useActiveDeck, useBackendToken, useDeckMenuState } from "@/state/store"
import FlashcardView from "../flashcard/flashcardView"
import { FlashcardData } from "@/lib/flashcard-types"
import FlashcardEditorView from "../flashcard-editor/flashcardEditorView"
import { Session } from "next-auth"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
const demo: FlashcardData = {
    backSide: `<ul class="list-disc"><li><p>something else huh <em>dude</em> <strong>crazyfafwa</strong></p></li></ul>`,
    frontSide: `something on the front side. **haha0** 
    **fnaowif**
*miofawmge*


> ~~-----fafwaf~~
---
fawfswe
    `,
    reviewFactor: 1,
    reviewInterval: 1,
    reviewPriority: 1,
    answerImageUrl: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
    questionImageUrl: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
    answerAudioUrl: "https://file-examples.com/storage/fe519944ff66ba53b99c446/2017/11/file_example_MP3_700KB.mp3",
    questionAudioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"
}
function DisplayFlashcards() {
    const { activeDeck } = useActiveDeck()

    return (<>
        <div className="flex flex-row w-full items-center justify-center">

            <FlashcardEditorView />
        </div>
    </>)
}

export default function FlashcardCards({ user }: {
    user: Session | null
}) {
    const { activeDeck } = useActiveDeck()
    const { setToken } = useBackendToken()
    const {isDeckMenuOpen} = useDeckMenuState()
    useEffect(() => {
        //@ts-ignore
        setToken(user?.user!.backendToken)
    }, [])
    return (
        <div className={cn("mt-10 flex items-center read-only: justify-center rounded-md p-2 transition-all duration-300 md:min-w-[100vw-320px] md:translate-x-0" , (isDeckMenuOpen?"translate-x-[100vw] min-w-0":'translate-x-0 min-w-[98vw]'))}>
            <div className="w-full h-full">
                {activeDeck == null ? "Select something to begin with, or create new." : <><DisplayFlashcards /></>}
            </div>
        </div>)
}