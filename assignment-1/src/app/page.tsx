"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import quotesData from "./data/quotes"

type Quote = { text: string; author: string }
type QuotesData = Record<string, Quote[]>

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
    const lower = selectedTopic.trim().toLowerCase()
    if ((quotesData as QuotesData)[lower]) {
      setQuotes((quotesData as QuotesData)[lower])
    } else {
      setQuotes([])
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 space-y-8">
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
            <Card key={idx}>
              <CardContent className="p-4">
                <p className="text-xl">“{quote.text}”</p>
                <p className="text-sm text-right mt-2">— {quote.author}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          topic && (
            <p className="text-gray-500">No quotes found for "{topic}". Try another topic.</p>
          )
        )}
      </div>
    </main>
  )
}