import { FlashcardData } from "@/lib/flashcard-types"
import MarkdownEditor from "../markdown-editor/MarkdownEditor"
import { FlashcardButton, FlashcardButtonType } from "../flashcard/flashcardButton";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useActiveDeck } from "@/state/store";
import { Input } from "../ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
export default function FlashcardEditor({ flashcardData }: {
    flashcardData: FlashcardData
}) {
    const { activeDeck } = useActiveDeck()
    const [isFrontEditorMenuVisible, setIsFrontEditorMenuVisible] = useState(false)
    const [isRearEditorMenuVisible, setIsRearEditorMenuVisible] = useState(false)
    return (<>
        <Card className="overflow-x-hidden w-[50%]">
            {/* <div className="h-[600px] overflow-y-scroll"> */}
            <ScrollArea className="h-[700px] rounded-md pt-3 pb-5 w-full mt-4 p-2 ">
                <CardHeader className="">
                    <CardTitle className="text-center text-lg flex w-full justify-between relative">
                        <span className="w-full text-xl">
                            {activeDeck?.title}
                        </span>
                    </CardTitle>
                </CardHeader>
                <div className="flex flex-col justify-center items-center gap-y-4">
                    <h1 className="text-2xl font-semibold p-1 text-center">Front side</h1>
                    <span className="w-[50%]">
                        <Label htmlFor="audioFront">Add an audio for the front side</Label>
                        <Input type="file" id="audioFront" accept=".mp3 .ogg .wav" className="cursor-pointer " />
                    </span>
                    <span className="w-[50%]">
                        <Label htmlFor="imageFront">Add an image for the front side</Label>
                        <Input type="file" id="imageFront" accept=".jpeg .png .svg" className="cursor-pointer " />
                    </span>
                    <div>
                        Front side text content
                    </div>
                    <MarkdownEditor
                        menuBarClassName={isFrontEditorMenuVisible ? "" : "hidden"}
                        onFocus={() => {
                            console.log("It is in focus")
                            setIsFrontEditorMenuVisible(true)
                        }}
                        onBlur={() => {
                            console.log("It is bluured")
                            setIsFrontEditorMenuVisible(false)
                        }}
                        content="something" className={cn("w-[380px] sm:w-[420px] md:w-[450px] p-2", (!isFrontEditorMenuVisible ? "border-red-400 border rounded-md" : ""))} containerClassName="flex justify-center items-center flex-col" />
                </div>
                <Separator className="my-3" />
                <div className="flex flex-col justify-center items-center gap-y-4">
                    <h1 className="text-2xl font-semibold p-1 text-center">Rear Side</h1>
                    <span className="w-[50%]">
                        <Label htmlFor="audioRear">Add an audio for the rear side</Label>
                        <Input type="file" id="audioRear" accept=".mp3 .ogg .wav" className="cursor-pointer " />
                    </span>
                    <span className="w-[50%]">
                        <Label htmlFor="imageRear">Add an image for the rear side</Label>
                        <Input type="file" id="imageRear" accept=".jpeg .png .svg" className="cursor-pointer " />
                    </span>
                    <div>
                        Rear side content text
                    </div>
                    <MarkdownEditor
                        menuBarClassName={isRearEditorMenuVisible ? "" : "hidden"}
                        onFocus={() => {
                            console.log("It is in focus")
                            setIsRearEditorMenuVisible(true)
                        }}
                        onBlur={() => {
                            console.log("It is bluured")
                            setIsRearEditorMenuVisible(false)
                        }}
                        content="something" className={cn("w-[380px] sm:w-[420px] md:w-[450px] p-2", (!isRearEditorMenuVisible ? "border-red-400 border rounded-md" : ""))} containerClassName="flex justify-center items-center flex-col" />
                </div>
            </ScrollArea>
            <CardFooter>

            </CardFooter>
        </Card>
    </>)
}