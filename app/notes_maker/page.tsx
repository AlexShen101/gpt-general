import Converter from '@/app/components/ConversionPage'

export default function CardsToNotes() {
  return (
    <Converter
      title="Convert Flashcards to Notes"
      type="notes"
      inputPlaceholder="Paste your flashcards here..."
    />
  )
}