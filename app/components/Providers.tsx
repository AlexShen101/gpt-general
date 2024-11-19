'use client'

import { SessionProvider } from 'next-auth/react'
import { useState, useEffect } from 'react'

export function NextAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // or a loading spinner
  }

  return <SessionProvider>{children}</SessionProvider>
}