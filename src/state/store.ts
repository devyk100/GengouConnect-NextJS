import { FlashcardDeckType } from '@/components/flashcard-page/flashcard-decks'
import { create } from 'zustand'

interface ActiveDeckState {
    activeDeck: FlashcardDeckType | null,
    setActiveDeck: (newDeck: FlashcardDeckType) => void
}

export const useActiveDeck = create<ActiveDeckState>()((set) => ({
    activeDeck: null,
    setActiveDeck: (newDeck:FlashcardDeckType) => set((state) => ({activeDeck:newDeck}))
}))

export enum EditorStateType {
    newCard,
    editCard,
    reviewCard
}

interface FlashcardEditorState {
    editorState: EditorStateType,
    setEditorState:(newEditorState:EditorStateType) => void
}

export const useFlashcardEditorState = create<FlashcardEditorState>()((set) => ({
    editorState: EditorStateType.reviewCard,
    setEditorState: (newEditorState:EditorStateType) => set((state) => ({editorState:newEditorState}))
}));