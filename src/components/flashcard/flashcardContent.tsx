import { FlashcardData } from "@/lib/flashcard-types"
import Markdown from 'react-markdown'
import { CardContent } from "../ui/card"
import { Children, useEffect, useState } from "react"
import Image from "next/image"
import { Separator } from "../ui/separator"
import MarkdownEditor from "../markdown-editor/MarkdownEditor"
import { EditorStateType, useFlashcardEditorState } from "@/state/store"
export function CustomMarkdown({ value }: {
    value: string
}) {
    return (
        <Markdown components={{
            h1: ({ children }) => {
                console.log(children)
                return <div className="text-4xl">{children}</div>
            },
            h2: ({ children }) => {
                return <div className="text-3xl">{children}</div>
            },
            h3: ({ children }) => {
                return <div className="text-2xl">{children}</div>
            },
            h4: ({ children }) => {
                return <div className="text-xl">{children}</div>
            },
            h5: ({ children }) => {
                return <div className="text-lg">{children}</div>
            },
            line: ({}) => {
                return <Separator className="my-2"/>
            }
        }}>
            {value}
        </Markdown>
    )
}

export default function FlashcardContent({ flashcardData, isFlipped }: {
    flashcardData: FlashcardData,
    isFlipped: boolean,
    editable?: boolean
}) {
    const [imageUrl, setImageUrl] = useState<string | undefined>()
    const {editorState} = useFlashcardEditorState()
    useEffect(() => {
        if(isFlipped){
            setImageUrl(flashcardData.answerImageUrl)
        } else {
            setImageUrl(flashcardData.questionImageUrl)
        }
    }, [isFlipped])
    useEffect(() => {
        if(isFlipped){
            setImageUrl(flashcardData.answerImageUrl)
        } else {
            setImageUrl(flashcardData.questionImageUrl)
        }
    }, [isFlipped])
    return (
        <>
            <CardContent className="leading-7">
                {imageUrl? <Image alt="something"  src={imageUrl} unselectable="off" aria-readonly unoptimized height={100} width={100} layout="responsive"/>:null}
                <MarkdownEditor content={(editorState == EditorStateType.newCard) ? (""): isFlipped? flashcardData.backSide: flashcardData.frontSide} editable={editorState == EditorStateType.reviewCard ? false : true} />
            </CardContent>
        </>
    )
}