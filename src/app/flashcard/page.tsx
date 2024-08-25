import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import PlusIcon from "../../../public/plus.svg"
import Image from "next/image";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function FlashcardPage() {
    const FlashcardDeckData = {};
    return (
        <>
            <section className="flex flex-row h-screen">
                <div className=" w-[20%] mt-5 ">
                    <div className="text-3xl px-2 font-bold">Flashcards</div>

                    <Sheet>
                        <SheetTrigger>                <Button className="m-2" variant="default"><Image alt="plus" src={PlusIcon} height={20} width={10} className="-ml-5 h-[50px] w-[50px]" />Create Deck</Button></SheetTrigger>
                        <SheetContent side={"left"}>
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    <ScrollArea className="rounded-md border p-4 h-full">
                    </ScrollArea>
                </div>
                <Separator orientation="vertical" className="" />
                <div className="flex items-center justify-center rounded-md p-2 w-full">
                    <div>
                        Select something to begin with, or create new.
                    </div>
                </div>
            </section>
        </>
    )
}