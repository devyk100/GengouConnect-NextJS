import { FlashcardData } from "@/lib/flashcard-types";
import MarkdownEditor from "../markdown-editor/MarkdownEditor";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useActiveDeck, useBackendToken, useFlashcardState } from "@/state/store";
import { Input } from "../ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { createFlashcard } from "@/db/get-post-delete-requests";
import ImageInputs, { InputType } from "../inputs/image-inputs";

export type FlashcardSide = {
    content: string;
    audioUrl: string;
    imageUrl: string;
};

export default function FlashcardEditor() {
    const { flashcard: flashcardData } = useFlashcardState();
    const { token } = useBackendToken();
    const { activeDeck } = useActiveDeck();
    
    // Initialize states with flashcardData if available
    const [frontSide, setFrontSide] = useState<FlashcardSide>({
        content: flashcardData?.FrontSide ?? "",
        audioUrl: flashcardData?.FrontAudio ?? "",
        imageUrl: flashcardData?.FrontImage ?? ""
    });
    const [rearSide, setRearSide] = useState<FlashcardSide>({
        content: flashcardData?.RearSide ?? "",
        audioUrl: flashcardData?.RearAudio ?? "",
        imageUrl: flashcardData?.RearImage ?? ""
    });

    const { mutate: createFlashcardMutate, isPending } = useMutation({
        mutationFn: createFlashcard,
        mutationKey: ["flashcard-create", flashcardData, activeDeck?.id ?? -1]
    });

    return (
        <Card className="overflow-x-hidden min-w-[30%] max-w-[32%] select-none">
            <CardHeader>
                <CardTitle className="text-center text-lg flex w-full justify-between relative">
                    <span className="w-full text-xl text-cyan-500">
                        Deck: {activeDeck?.title}
                    </span>
                </CardTitle>
            </CardHeader>
            <Separator />
            <ScrollArea className="h-[700px] rounded-md pt-3 pb-5 w-full mt-1 p-2">
                <div className="flex flex-col justify-center items-center gap-y-4">
                    <h1 className="text-2xl font-semibold p-1 text-center">Front side</h1>
                    <span className="w-[50%]">
                        <Label htmlFor="audioFront">Add an audio for the front side</Label>
                        <ImageInputs 
                            inputType={InputType.AudioInput} 
                            initialPreview={frontSide.audioUrl} 
                            onUpdate={(val) => setFrontSide(prevVal => ({ ...prevVal, audioUrl: val }))} 
                            id="audioFront" 
                        />
                    </span>
                    <span className="w-[50%]">
                        <Label htmlFor="imageFront">Add an image for the front side</Label>
                        <ImageInputs 
                            inputType={InputType.ImageInput} 
                            initialPreview={frontSide.imageUrl} 
                            onUpdate={(val) => setFrontSide(prevVal => ({ ...prevVal, imageUrl: val }))} 
                            id="imageFront" 
                        />
                    </span>
                    <div>Front side text content</div>
                    <MarkdownEditor
                        menuBarClassName={"w-[380px] sm:w-[420px] md:w-[450px]"}
                        onUpdate={(val) => setFrontSide(prevVal => ({ ...prevVal, content: val }))}
                        content={frontSide.content} 
                        className={cn("w-[380px] sm:w-[420px] md:w-[450px] p-2", "border-red-400 border rounded-md")} 
                        containerClassName="flex justify-center items-center flex-col" 
                    />
                </div>
                <Separator className="my-3" />
                <div className="flex flex-col justify-center items-center gap-y-4">
                    <h1 className="text-2xl font-semibold p-1 text-center">Rear Side</h1>
                    <span className="w-[50%]">
                        <Label htmlFor="audioRear">Add an audio for the rear side</Label>
                        <ImageInputs 
                            inputType={InputType.AudioInput} 
                            initialPreview={rearSide.audioUrl} 
                            onUpdate={(val) => setRearSide(prevVal => ({ ...prevVal, audioUrl: val }))} 
                            id="audioRear" 
                        />
                    </span>
                    <span className="w-[50%]">
                        <Label htmlFor="imageRear">Add an image for the rear side</Label>
                        <ImageInputs 
                            inputType={InputType.ImageInput} 
                            initialPreview={rearSide.imageUrl} 
                            onUpdate={(val) => setRearSide(prevVal => ({ ...prevVal, imageUrl: val }))} 
                            id="imageRear" 
                        />
                    </span>
                    <div>Rear side content text</div>
                    <MarkdownEditor
                        menuBarClassName={"w-[380px] sm:w-[420px] md:w-[450px]"}
                        onUpdate={(val) => setRearSide(prevVal => ({ ...prevVal, content: val }))}
                        content={rearSide.content} 
                        className={cn("w-[380px] sm:w-[420px] md:w-[450px] p-2", "border-red-400 border rounded-md")} 
                        containerClassName="flex justify-center items-center flex-col" 
                    />
                </div>
                <CardFooter></CardFooter>
            </ScrollArea>
            <div className="w-full flex justify-center items-center">
                <Button className="m-4 w-full" onClick={() => {
                    if (isPending) return;
                    createFlashcardMutate({
                        deckId: activeDeck?.id!,
                        frontAudioUrl: frontSide.audioUrl,
                        frontContent: frontSide.content,
                        frontImageUrl: frontSide.imageUrl,
                        rearAudioUrl: rearSide.audioUrl,
                        rearContent: rearSide.content,
                        rearImageUrl: rearSide.imageUrl,
                        reviewFactor: 10,
                        reviewInterval: 10,
                        token: token
                    });
                }}>Submit</Button>
            </div>
        </Card>
    );
}
