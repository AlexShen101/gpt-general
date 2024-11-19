// Landing page

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SignInButton from '@/app/components/SignInButton'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to Flashcard Creator</h1>
      
      {session ? (
        <div className="text-center">
          <p className="mb-4">Welcome, {session.user?.name}!</p>
          <SignInButton />
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4">Please sign in to continue</p>
          <SignInButton />
        </div>
      )}
    </main>
  )
}