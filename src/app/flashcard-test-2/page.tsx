import FlashcardView from "@/components/flashcard/flashcardView";
// import { ForwardRefEditor } from "@/components/markdown-editor/ForwardRefEditor";
import MarkdownEditor from "@/components/markdown-editor/MarkdownEditor";
import { FlashcardData } from "@/lib/flashcard-types";

export default function Page(){
    const demo: FlashcardData = {
        backSide: `<ul class="list-disc"><li><p>something else huh <em>dude</em> <strong>crazyfafwa</strong></p></li></ul>`,
        frontSide: `<ul class="list-disc"><li><p>something else huh <em>dude</em> <strong>crazyfafwa</strong></p></li></ul>`,
        reviewFactor: 1,
        reviewInterval: 1,
        reviewPriority: 1,
        answerImageUrl: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
        questionImageUrl: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
        answerAudioUrl: "https://file-examples.com/storage/fe519944ff66ba53b99c446/2017/11/file_example_MP3_700KB.mp3",
        questionAudioUrl: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"
    }
    return (
        <>
            <FlashcardView flashcardData={demo}/>
            {/* <FlashcardEditorView />
            <MarkdownEditor /> */}
        </>
    )
}