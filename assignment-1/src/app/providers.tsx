"use client"

import ThemeProvider from "next-themes" // <-- default import
import { ReactNode } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      {children}
    </ThemeProvider>
  )
}