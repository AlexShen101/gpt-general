import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SignInButtonClient } from './SignInButtonClient'

export default async function SignInButton() {
  const session = await getServerSession(authOptions)

  return <SignInButtonClient session={session} />
}