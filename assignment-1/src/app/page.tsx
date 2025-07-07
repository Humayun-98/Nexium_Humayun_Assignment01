"use client"

import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import quotesData from "./data/quotes"

type Quote = { text: string; author: string }
type QuotesData = Record<string, Quote[]>

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [topic, setTopic] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const availableTopics = Object.keys(quotesData)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const lower = topic.trim().toLowerCase()
    if (!lower) {
      setQuotes([])
      return
    }
    if ((quotesData as QuotesData)[lower]) {
      setQuotes((quotesData as QuotesData)[lower])
    } else {
      setQuotes([])
    }
  }

  const handleTopicClick = (selectedTopic: string) => {
    setTopic(selectedTopic)
    const lower = selectedTopic.trim().toLowerCase()
    if ((quotesData as QuotesData)[lower]) {
      setQuotes((quotesData as QuotesData)[lower])
    } else {
      setQuotes([])
    }
  }

  const handleCopy = (quote: Quote, idx: number) => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 space-y-8 transition-colors duration-300 bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Theme Toggle */}
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle Theme"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-4">Quote Generator</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col space-y-4">
        <Input
          placeholder="Enter a topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit">Generate Quotes</Button>
      </form>

      <div className="flex flex-wrap justify-center gap-2">
        {availableTopics.map((t) => (
          <Button
            key={t}
            variant="outline"
            onClick={() => handleTopicClick(t)}
            className="text-sm"
          >
            {t}
          </Button>
        ))}
      </div>

      <div className="w-full max-w-2xl space-y-4 mt-6">
        {quotes.length > 0 ? (
          quotes.map((quote, idx) => (
            <Card
              key={idx}
              className="transform transition duration-300 hover:scale-105 fade-in"
            >
              <CardContent className="p-4 flex flex-col space-y-2">
                <p className="text-xl">“{quote.text}”</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">— {quote.author}</span>
                  <button
                    onClick={() => handleCopy(quote, idx)}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    {copiedIdx === idx ? "Copied!" : "Copy"}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          topic && (
            <p className="text-gray-500">No quotes found for "{topic}". Try another topic.</p>
          )
        )}
      </div>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
