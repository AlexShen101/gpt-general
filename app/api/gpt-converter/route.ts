import OpenAI from 'openai'
import { NextResponse } from 'next/server'
import { PROMPTS } from './prompts'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

type ConversionType = 'flashcards' | 'notes'

export async function POST(req: Request) {
  try {
    const { text, type } = await req.json() as { 
      text: string; 
      type: ConversionType 
    }

    // Validate the conversion type
    if (type !== 'flashcards' && type !== 'notes') {
      return NextResponse.json(
        { error: 'Invalid conversion type. Must be either "flashcards" or "notes".' },
        { status: 400 }
      )
    }

    // Select the appropriate prompt based on type
    const prompt = type === 'flashcards' 
      ? PROMPTS.CREATE_FLASHCARDS_PROMPT 
      : PROMPTS.CREATE_NOTES_PROMPT

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: text }
      ],
      temperature: 0.7,
    })

    const result = completion.choices[0]?.message?.content || ''
    
    return NextResponse.json({ result })
  } catch (error) {
    console.error('Error in converter API:', error)
    return NextResponse.json(
      { error: 'Failed to convert text' },
      { status: 500 }
    )
  }
}