"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode, useEffect, useState } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Prevents hydration mismatch
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      {children}
    </ThemeProvider>
  )
}