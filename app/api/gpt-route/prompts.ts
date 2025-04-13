import { CREATE_FLASHCARDS_PROMPT } from "./create_flashcards_prompt"
import { DIATAXIS_REVIEW_PROMPT } from "./diataxis_review_prompt"
import { CREATE_NOTES_PROMPT } from "./create_notes_prompt"

export const PROMPTS = {
    flashcards: CREATE_FLASHCARDS_PROMPT,
    notes: CREATE_NOTES_PROMPT,
    diataxis_review: DIATAXIS_REVIEW_PROMPT
}

export type PromptType = keyof typeof PROMPTS