import './globals.css'
import { Inter } from "next/font/google"
import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Quote Generator",
  description: "A Nexium Internship Project",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
// This layout wraps the entire application with a theme provider