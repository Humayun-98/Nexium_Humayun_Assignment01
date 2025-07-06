"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { quotes } from "./data/quotes";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSubmit = () => {
    const filtered = quotes
      .filter(q => q.topic.toLowerCase() === topic.toLowerCase())
      .slice(0, 3)
      .map(q => q.text);
    setResults(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Input
          placeholder="Enter topic (e.g. life, success)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button onClick={handleSubmit}>Get Quotes</Button>

        <div className="space-y-2 mt-4">
          {results.map((quote, index) => (
            <Card key={index} className="p-4">
              {quote}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
