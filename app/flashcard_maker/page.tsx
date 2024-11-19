import Converter from '@/app/components/ConversionPage'

export default function NotesToCards() {
  return (
    <Converter
      title="Convert Notes to Flashcards"
      type="flashcards"
      inputPlaceholder="Paste your notes here..."
    />
  )
}