"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import quotesData from "./data/quotes"

type Quote = { text: string; author: string }
type QuotesData = Record<string, Quote[]>

// ...rest of your component

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [topic, setTopic] = useState("")

  const availableTopics = Object.keys(quotesData)

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
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-day dark:bg-night transition-colors duration-500 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="day-scene dark:hidden"></div>
        <div className="night-scene hidden dark:block"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 dark:from-purple-700 dark:via-blue-800 dark:to-black rounded-3xl p-8 shadow-xl backdrop-blur-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Quotly</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            placeholder="Search for a topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 justify-center">
            {availableTopics.map((t) => (
              <Button
                key={t}
                variant="outline"
                onClick={() => handleTopicClick(t)}
                className="text-sm hover:scale-105 transition-transform"
              >
                {t}
              </Button>
            ))}
          </div>
          <Button type="submit" className="mt-4 w-full">Generate Quotes</Button>
        </form>

        <div className="mt-8 space-y-4">
          {quotes.length > 0 ? (
            quotes.map((quote, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 dark:from-purple-900 dark:via-blue-900 dark:to-black p-4 rounded-xl shadow-md"
              >
                <p className="text-lg font-medium">“{quote.text}”</p>
                <p className="text-sm text-right mt-2 italic">— {quote.author}</p>
              </div>
            ))
          ) : (
            topic && (
              <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
                No quotes found for "{topic}". Try another topic.
              </p>
            )
          )}
        </div>
      </div>
    </main>
  )
}
