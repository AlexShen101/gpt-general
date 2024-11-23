import OpenAI from 'openai'
import { NextResponse } from 'next/server'
import { PROMPTS, PromptType } from './prompts'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { text, type } = await req.json() as { 
      text: string; 
      type: PromptType 
    }

    // Validate the conversion type
    if (!(type in PROMPTS)) {
      return NextResponse.json(
        { error: 'Invalid conversion type. Must be either "flashcards" or "notes".' },
        { status: 400 }
      )
    }

    const prompt = PROMPTS[type]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini-2024-07-18',
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