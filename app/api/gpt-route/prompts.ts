import { CREATE_FLASHCARDS_PROMPT } from "./create_flashcards_prompt"
import { DIATAXIS_REVIEW_PROMPT } from "./diataxis_review_prompt"

const CREATE_NOTES_PROMPT = `Only reply with "I have recieved the notes system prompt"`

export const PROMPTS = {
    flashcards: CREATE_FLASHCARDS_PROMPT,
    notes: CREATE_NOTES_PROMPT,
    diataxis_review: DIATAXIS_REVIEW_PROMPT
}

export type PromptType = keyof typeof PROMPTS