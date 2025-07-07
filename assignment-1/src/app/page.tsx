"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { quotes } from "./data/quotes";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [displayQuotes, setDisplayQuotes] = useState<string[]>([]);

  const handleGenerate = () => {
    // filter quotes by topic (case-insensitive)
    const filtered = quotes.filter(q =>
      q.topic.toLowerCase().includes(topic.toLowerCase())
    );

    // pick 3 or fallback to random 3
    const selected = (filtered.length >= 3 ? filtered : quotes)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(q => q.text);

    setDisplayQuotes(selected);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold">Quote Generator</h1>

      <div className="flex space-x-2 w-full max-w-md">
        <Input
          placeholder="Enter topic (e.g. life, motivation)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button onClick={handleGenerate}>
          Generate
        </Button>
      </div>

      <div className="w-full max-w-md space-y-4">
        {displayQuotes.map((quote, idx) => (
          <Card key={idx} className="p-4 shadow">
            <p>{quote}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
