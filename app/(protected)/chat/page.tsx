"use client";

import { FormEvent, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SummaryBox from "@/components/chat/summary-box";
import { useChatStore } from "@/app/context/chat-store";

export default function ChatPage() {
  const contentTypes = [
    "Blog Post",
    "Social Media",
    "Product Description",
    "Email",
    "Ad Copy",
  ];

  const tones = [
    "Professional",
    "Friendly",
    "Casual",
    "Persuasive",
    "Informative",
  ];

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [topic, setTopic] = useState("");

  // chat store
  const { showSummary, enableSummary } = useChatStore();

  // function the handle the chat
  async function onSubmit(e: FormEvent) {
    try {
      e.preventDefault();

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          enableSummary();
          console.log(
            `Generated content about "${topic}" with type "${selectedType}" and tone "${selectedTone}"`
          );
          resolve();
        }, 3000);
      });
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Failed to generate content. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Content Flow Chat
          </h2>
          <p className="text-muted-foreground text-sm">
            See for yourself how Content Flow can transform your writing
            process.
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">
              What would you like to write about?
            </h3>
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your topic or idea here..."
              className="min-h-[120px]"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Select Content Type</h3>
            <div className="flex flex-wrap gap-2">
              {contentTypes.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Select Tone</h3>
            <div className="flex flex-wrap gap-2">
              {tones.map((tone) => (
                <Button
                  key={tone}
                  type="button"
                  variant={selectedTone === tone ? "default" : "outline"}
                  onClick={() => setSelectedTone(tone)}
                  className="capitalize"
                >
                  {tone}
                </Button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={!topic || !selectedType || !selectedTone}
          >
            Generate Content
          </Button>
        </form>
        {showSummary ? (
          <Suspense fallback={<div>Loading summary...</div>}>
            <SummaryBox content={topic} />
          </Suspense>
        ) : (
          <div className="text-center text-muted-foreground mt-4">
            Your generated content summary will appear here.
          </div>
        )}
      </div>
    </div>
  );
}
