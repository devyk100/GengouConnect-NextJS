"use client";

import { FlashcardData } from "@/lib/flashcard-types"
// import FlashcardEditor from "./flashcardEditor";
import { FlashcardButton, FlashcardButtonType } from "../flashcard/flashcardButton";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
const FlashcardEditor = dynamic(() => import('./flashcardEditor'), {
  // suspense: true,
  loading: () => <EditorSkeleton />,
  ssr: false,
});
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

function EditorSkeleton() {
  return (<>
<div className="w-[400px] h-[500px] flex items-center justify-center">

<div role="status" className="">
    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
</div>

  </>)
}


export default function FlashcardEditorView() {
  const [isFlipped, setIsFlipped] = useState(false)
  return (
    <>
      <div className="flex w-screen h-screen items-center justify-center overflow-x-hidden p-0 m-0">
        <Card className="overflow-x-hidden -mt-28 ">
          {/* <div className="h-[600px] overflow-y-scroll"> */}
          <ScrollArea className="h-[700px] rounded-md pt-3 pb-5 w-full mt-4 p-2 ">
            <CardHeader className="">
              <CardTitle className="text-center text-lg flex w-full justify-between relative">
                {/* {isFlipped?
                                 <Button className="absolute rounded-full w-[55px] flex h-[55px] top-0 left-0 -m-3" variant="secondary" onClick={() => {
                                  setIsFlipped(false)
                                  }}>
                                  <Image alt="back" src={backSvg} className="h-[55px] w-[55px]" />
                                  </Button>: null
                                  } */}
                <span className="w-full text-xl">
                  Flashcard Editor
                </span>
              </CardTitle>
            </CardHeader>

            {/* <Suspense fallback={<EditorSkeleton />}> */}
            {/* <EditorSkeleton /> */}
              <FlashcardEditor flashcardData={demo} />
            {/* </Suspense> */}

          </ScrollArea>
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