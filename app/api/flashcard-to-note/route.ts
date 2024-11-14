import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `a prompt lol`

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text }
      ],
      temperature: 0.7,
    })

    const result = completion.choices[0]?.message?.content || ''
    
    return NextResponse.json({ result })
  } catch (error) {
    console.error('Error in convert-cards API:', error)
    return NextResponse.json(
      { error: 'Failed to convert cards' },
      { status: 500 }
    )
  }
}