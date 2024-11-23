'use client'

import { useState } from 'react'
import { PromptType } from '../api/gpt-route/prompts'

type ConverterProps = {
  title: string
  type: PromptType
  inputPlaceholder: string
}

export default function Converter({ title, type, inputPlaceholder }: ConverterProps) {
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleConvert = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/gpt-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: inputText,
          type
        }),
      })
      
      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      console.error('Error converting text:', error)
      setResult('Error converting text. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="space-y-4">
        <textarea
          className="w-full h-48 p-3 border rounded-lg text-white bg-gray-800 border-gray-700"
          placeholder={inputPlaceholder}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        
        <button
          onClick={handleConvert}
          disabled={isLoading || !inputText}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700"
        >
          {isLoading ? 'Converting...' : `Convert to ${type === 'flashcards' ? 'Flashcards' : 'Notes'}`}
        </button>
      </div>

      {result && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Result:</h2>
          <div className="relative">
            <pre className="p-4 bg-gray-800 rounded-lg whitespace-pre-wrap border border-gray-700">
              {result}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="absolute top-2 right-2 px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600 text-white"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}