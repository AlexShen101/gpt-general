'use client'

import { useState } from 'react'

export default function CardsToNotes() {
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleConvert = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/flashcard-to-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })
      
      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      console.error('Error converting cards:', error)
      setResult('Error converting cards. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Convert Flashcards to Notes</h1>
      
      <div className="space-y-4">
        <textarea
          className="w-full h-48 p-3 border rounded-lg text-black"
          placeholder="Paste your flashcards here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        
        <button
          onClick={handleConvert}
          disabled={isLoading || !inputText}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          {isLoading ? 'Converting...' : 'Convert to Notes'}
        </button>
      </div>

      {result && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Result:</h2>
          <div className="relative">
            <pre className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
              {result}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="absolute top-2 right-2 px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}