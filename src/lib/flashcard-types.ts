export  type FlashcardData = {
    frontSide: string,
    backSide: string,
    questionAudioUrl?: string,
    answerAudioUrl?: string,
    questionImageUrl?: string,
    answerImageUrl?: string
    reviewFactor: Number,
    reviewInterval: Number,
    reviewPriority: Number
}
