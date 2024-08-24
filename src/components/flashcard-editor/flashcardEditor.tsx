import { FlashcardData } from "@/lib/flashcard-types"
import MarkdownEditor from "../markdown-editor/MarkdownEditor"

export default function FlashcardEditor({flashcardData}: {
    flashcardData: FlashcardData
}){
    return (<> 
    <MarkdownEditor content={flashcardData.backSide} className="w-[400px] sm:w-[450px] md:w-[500px] p-2 border-x-2 border-blue-400 cursor-text mt-6"  containerClassName="flex items-center flex-col"/>
    </>)
}