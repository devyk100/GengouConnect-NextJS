import { getFlashcardsForDeck } from "@/db/get-post-delete-requests"
import { useActiveDeck, useBackendToken, useFlashcardState } from "@/state/store"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "./flashcardEditorView"
import parse from 'html-react-parser';
import ReactQueryProvider from "../providers/react-query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

export type FlashcardType = {
    DeckID: number
    DueDate: Date
    FrontAudio: string
    FrontImage: string
    FrontSide: string
    ID: number
    RearAudio: string
    RearImage: string
    RearSide: string
    ReviewFactor: number
    ReviewInterval: number
    UnreviewedPriorityNum: number
}

export default function FlashcardCardList() {
    const { activeDeck } = useActiveDeck()
    const { token } = useBackendToken()
    const {setFlashcard, flashcard} = useFlashcardState()
    const { data: flashcardsData, isLoading } = useQuery({
        queryFn: () => (getFlashcardsForDeck({ deckId: activeDeck?.id!, token: token })),
        queryKey: ["get-flashcards", activeDeck?.id],
        gcTime: 10
    })
    return (<>
        <ReactQueryDevtools />
        <div className="w-[30%] h-[90vh] flex flex-col px-2">
        <Button className="mx-4 w-fit">Create a flashcard</Button>
            {isLoading ? <Loader /> : <></>}
            <ScrollArea className="w-full">
            {flashcardsData?.map((val: FlashcardType, index: number) => {
                return (
                    <div className="h-16 p-1 overflow-y-hidden border rounded-md overflow-x-hidden m-2 flex justify-between relative gap-2 items-center cursor-pointer select-none hover:bg-primary-foreground" onClick={() => {
                        setFlashcard(val)
                        console.log(val,"current")
                    }}>
                        <span className="p-2 font-semibold">{index + 1}</span>
                        <span className="w-full absolute top-2 left-8">{parse(val.FrontSide)}</span></div>
                )
            })}
            </ScrollArea>
        </div>
    </>)
}