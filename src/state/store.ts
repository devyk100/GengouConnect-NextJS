import { FlashcardType } from '@/components/flashcard-editor/flashcardCardList'
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


interface BackendToken {
    token: string,
    setToken: (newToken:string) => void
}

export const useBackendToken = create<BackendToken>()((set) => ({
    token: "",
    setToken: (newToken: string) => set((state) => ({token:newToken}))
}))

interface FlashcardState {
    flashcard: FlashcardType | undefined,
    setFlashcard: (newFlashcard:FlashcardType) => void
}

export const useFlashcardState = create<FlashcardState>()((set) => ({
    flashcard: undefined,
    setFlashcard: (newFlashcard: FlashcardType) => set((state) => ({flashcard:newFlashcard}))
}))

interface DeckMenuState{
    isDeckMenuOpen: boolean,
    setDeckMenuOpen: (val:boolean) => void
}

export const useDeckMenuState = create<DeckMenuState>()((set) => ({
    isDeckMenuOpen: true,
    setDeckMenuOpen: (val: boolean) => set((state) => ({isDeckMenuOpen: val}))
}))

