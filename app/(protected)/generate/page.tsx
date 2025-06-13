"use client";

import { FormEvent, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenAI } from "@google/genai";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function GeneratePage() {
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
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const contentEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when content updates
  useEffect(() => {
    contentEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [generatedContent]);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    toast.success("Content copied to clipboard!");
  };

  async function onSubmit(e: FormEvent) {
    try {
      e.preventDefault();
      setIsLoading(true);
      setGeneratedContent("");

      const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API,
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Generate a ${selectedType} about ${topic} in a ${selectedTone} tone`,
        config: {
          maxOutputTokens: 500,
        },
      });

      // Simulate streaming effect
      const text = response?.text ?? "";
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setGeneratedContent(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsLoading(false);
          toast.success("Content generated successfully!");
        }
      }, 20);
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again later.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Content Flow AI</h1>
          <p className="text-muted-foreground">
            Generate high-quality content in seconds with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Card */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Content Generator
              </CardTitle>
              <CardDescription>
                Describe what you need and let AI do the writing
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="topic" className="font-medium">
                    Topic or Idea
                  </Label>
                  <Textarea
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., 'The benefits of remote work for productivity'"
                    className="min-h-[120px] text-base"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="font-medium">Content Type</Label>
                  <RadioGroup className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {contentTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={type}
                          id={type}
                          checked={selectedType === type}
                          onClick={() => setSelectedType(type)}
                          disabled={isLoading}
                          className="h-4 w-4"
                        />
                        <Label
                          htmlFor={type}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {type}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="font-medium">Tone</Label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map((tone) => (
                      <Button
                        key={tone}
                        type="button"
                        variant={
                          selectedTone === tone ? "default" : "secondary"
                        }
                        size="sm"
                        onClick={() => setSelectedTone(tone)}
                        className="capitalize"
                        disabled={isLoading}
                      >
                        {tone}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={
                    !topic || !selectedType || !selectedTone || isLoading
                  }
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Content"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Output Card */}
          <Card className="border-border shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    AI Generated Content
                  </CardTitle>
                  <CardDescription>
                    {selectedType && selectedTone ? (
                      <span>
                        {selectedType} in {selectedTone.toLowerCase()} tone
                      </span>
                    ) : (
                      "Your content will appear here"
                    )}
                  </CardDescription>
                </div>
                {generatedContent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-muted-foreground"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </CardHeader>

            <Separator className="mb-4" />

            <CardContent className="p-0">
              <ScrollArea className="h-[400px] px-4">
                {isLoading && !generatedContent ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Generating your content...
                      </p>
                    </div>
                  </div>
                ) : generatedContent ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {generatedContent}
                    </Markdown>
                    <div ref={contentEndRef} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <div className="bg-muted rounded-full p-4 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      No content generated yet
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Enter your topic, select content type and tone, then click
                      {"Generate Content"}
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>

            {generatedContent && (
              <CardFooter className="flex justify-between items-center border-t px-4 py-3">
                <div className="flex gap-2">
                  <Badge variant="outline">{selectedType}</Badge>
                  <Badge variant="outline">{selectedTone}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {generatedContent.length} characters
                </p>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
