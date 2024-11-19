import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SignInButton from './SignInButton'

export default async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo/Home */}
            <Link 
              href="/" 
              className="flex items-center px-2 py-2 text-gray-300 hover:text-white font-medium"
            >
              Flashcard Creator
            </Link>

            {/* Navigation Links - Only show if logged in */}
            {session && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/notes_maker"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent hover:border-gray-300"
                >
                  Notes Maker
                </Link>
                <Link
                  href="/flashcard-to-note"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent hover:border-gray-300"
                >
                  Flashcard to Notes
                </Link>
              </div>
            )}
          </div>

          {/* Auth Button */}
          <div className="flex items-center">
            <SignInButton />
          </div>
        </div>
      </div>

      {/* Mobile menu - Only show if logged in */}
      {session && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/notes_maker"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Notes Maker
            </Link>
            <Link
              href="/flashcard-to-note"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Flashcard to Notes
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}