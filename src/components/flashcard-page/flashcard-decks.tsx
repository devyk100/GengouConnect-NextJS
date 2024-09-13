"use client"
import { createDeck, getDecks } from "@/db/get-post-delete-requests";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlusIcon from "../../../public/plus.svg"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useActiveDeck, useDeckMenuState } from "@/state/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
// import { useActiveDeck } from "@/state/store";
export type FlashcardDeckType = {
    title: string,
    id: number,
    newCards: number,
    reviewCards: number
}

export default function FlashcardDecks({ decks, user }: {
    decks: FlashcardDeckType[];
    user: Session | null
}) {

    const { activeDeck, setActiveDeck } = useActiveDeck()
    const {setDeckMenuOpen} = useDeckMenuState()
    const { data: decksData, isLoading } = useQuery({
        initialData: decks,
        refetchOnWindowFocus: true,
        retry: true,
        staleTime: 1000 * 60 * 3,
        gcTime: 1000 * 60 * 4,
        refetchInterval: 1000 * 60 * 3,
        queryKey: ["decks"],
        //@ts-ignore
        queryFn: () => (getDecks({ token: user?.user?.backendToken }))
    })
    const queryClient = useQueryClient()
    const { mutate: createDeckMutate, isPending } = useMutation({
        mutationFn: createDeck,
        mutationKey: ["createDeck"],
        onSuccess: (options) => {
            queryClient.invalidateQueries({
                queryKey: ["decks"]
            })
        }
    })
    const [title, setTitle] = useState("")
    return (
        <>
            <div className="text-3xl px-2 font-bold p-2 border-t-[0.5px]">Flashcards</div>

            <Dialog>
                <DialogTrigger className="bg-primary text-primary-foreground shadow hover:bg-primary/90 m-2 h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    <Image alt="plus" src={PlusIcon} height={20} width={10} className="-ml-5 h-[50px] w-[50px]" />
                    Create Deck
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className="flex flex-col">
                        <DialogTitle>Create a new flashcard deck?</DialogTitle>
                        <DialogDescription>
                            <Label htmlFor="name" className="my-1">Flashcard deck title</Label>

                            <Input id="name" name="name" value={title} onChange={(event) => setTitle(event.target.value)} />
                            <div className="my-1">
                                Enter a name for your flashcard deck.
                            </div>
                            <DialogClose asChild>
                                <Button className="mt-2" type="submit" onClick={async () => {
                                    if(title.trim().length == 0) {
                                        toast("Enter a valid name for the flashcard deck please", {
                                            description: "the flashcard deck name",
                                            // cancel: {},
                                            action: {
                                                label:"Okay",
                                                onClick: () => {}
                                            }
                                        })
                                        return
                                    }
                                    if(isPending) return
                                    const user = await getSession()
                                    //@ts-ignore
                                    createDeckMutate({ token: user?.user?.backendToken, title: title })
                                    toast("Successfully created the card", {
                                        description: "Created the deck "+title,
                                        // cancel: {},
                                        action: {
                                            label:"Okay",
                                            onClick: () => {}
                                        }
                                    })
                                    setTitle("")
                                }}>Create</Button>
                            </DialogClose>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <ScrollArea className="rounded-md border p-4 h-[80vh]">
                {!isLoading ?
                    decksData?.map((val: FlashcardDeckType) => {
                        console.log(val)
                        console.log("Inside the maps")
                        return (<div className={cn("cursor-pointer border-b mb-1 w-full rounded-md p-1 px-3 bg-primary-foreground hover:bg-lime-400 dark:hover:bg-lime-800", (val.id == activeDeck?.id ? "bg-lime-300 dark:bg-lime-900" : ""))} key={val.id} onClick={() => {
                            // queryClient.invalidateQueries({queryKey:["get-flashcards", activeDeck?.id]})
                            // queryClient.refetchQueries({queryKey:["get-flashcards", activeDeck?.id]})
                            setActiveDeck(val)
                            setDeckMenuOpen(false)
                        }}>
                            <div className="font-semibold">{val.title}</div>
                            <div className="w-full flex flex-row gap-2 ml-2">
                                <span className="text-cyan-500">{val.newCards}</span>
                                <span className="text-red-500">{val.reviewCards}</span>
                            </div>
                        </div>)
                    }) : <>Loading</>
                }
            </ScrollArea>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </>
    )
}