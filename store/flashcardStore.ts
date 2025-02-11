import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Flashcard } from "@/types/global";

interface ISaveFlashCards {
  flashCardName: string;
  data: Flashcard[];
}

type FlashcardStore = {
  flashCardData: Flashcard[];
  extractedText: string;
  savedFlashCard: ISaveFlashCards[];
  setExtractedText: (extractedText: string) => void;
  setFlashcardData: (flashCardData: Flashcard[]) => void;
  setSavedFlashCard: (savedFlashCard: ISaveFlashCards[]) => void;
};

export const useFlashcardStore = create<FlashcardStore>()(
  devtools(
    persist(
      (set) => ({
        flashCardData: [],
        setFlashcardData: (flashCardData) => set({ flashCardData }),
        savedFlashCard: [],
        setSavedFlashCard: (savedFlashCard) => set({ savedFlashCard }),
        extractedText: "",
        setExtractedText: (extractedText) => set({ extractedText }),
      }),
      {
        name: "flashcard-storage", // Key for localStorage
      }
    )
  )
);
