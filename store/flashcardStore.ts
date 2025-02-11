import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Flashcard } from "@/types/global";

type FlashcardStore = {
  flashCardData: Flashcard[];
  extractedText: string;
  setExtractedText:  (extractedText: string) => void;
  setFlashcardData: (flashCardData: Flashcard[]) => void;
};

export const useFlashcardStore = create<FlashcardStore>()(
  devtools(
    persist(
      (set) => ({
        flashCardData: [],
        setFlashcardData: (flashCardData) => set({ flashCardData }),
        extractedText: "",
        setExtractedText:  (extractedText) => set({ extractedText }),
      }),
      {
        name: "flashcard-storage", // Key for localStorage
      }
    )
  )
);
