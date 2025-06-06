import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { PricingSection } from "@/components/pricing-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="container py-24 sm:py-32">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  AI-Powered Content Creation
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground">
                  Elevate your writing with Content Flow - the intelligent
                  assistant that helps you create engaging, high-quality content
                  in seconds.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button className="w-full sm:w-auto" size="lg" asChild>
                  <Link href="/signup">Start Writing for Free</Link>
                </Button>
                <Button
                  className="w-full sm:w-auto"
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <Link href="#demo">See How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative rounded-xl bg-muted p-1 shadow-2xl">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 blur"></div>
                <div className="relative rounded-xl bg-background p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-4">
                      <p className="font-mono text-sm text-muted-foreground">
                        &gt; Generate blog post about "AI in content creation"
                      </p>
                      <p className="font-mono text-sm">
                        AI is revolutionizing content creation by enabling
                        faster production, personalized content, and data-driven
                        insights. Content Flow leverages these advancements to
                        help you create better content in less time...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-24 sm:py-32">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Content Flow comes packed with everything you need to create
              amazing content
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "AI Writing Assistant",
                description:
                  "Get intelligent suggestions and complete sentences as you type.",
                icon: <Icons.wand />,
              },
              {
                title: "Content Templates",
                description:
                  "Pre-built templates for blogs, social media, ads, and more.",
                icon: <Icons.template />,
              },
              {
                title: "SEO Optimization",
                description:
                  "Get real-time SEO suggestions to improve your content ranking.",
                icon: <Icons.search />,
              },
              {
                title: "Tone Adjustment",
                description:
                  "Change the tone of your content with a single click.",
                icon: <Icons.volume />,
              },
              {
                title: "Plagiarism Check",
                description:
                  "Ensure your content is 100% original before publishing.",
                icon: <Icons.shield />,
              },
              {
                title: "Collaboration",
                description:
                  "Work with your team in real-time on content projects.",
                icon: <Icons.users />,
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Demo Section */}
        {/* <section id="demo" className="bg-muted py-24 sm:py-32">
          <div className="container grid gap-12 lg:grid-cols-2">
            <div className="p-4 space-y-4">
              <h2 className="text-3xl font-bold">Try Content Flow</h2>
              <p className="text-muted-foreground">
                See for yourself how Content Flow can transform your writing
                process.
              </p>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    What would you like to write about?
                  </label>
                  <Input placeholder="Enter a topic or keyword..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content type</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Blog Post",
                      "Social Media",
                      "Product Description",
                      "Email",
                      "Ad Copy",
                    ].map((type) => (
                      <Button key={type} variant="outline" size="sm">
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tone</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Professional",
                      "Friendly",
                      "Casual",
                      "Persuasive",
                      "Informative",
                    ].map((tone) => (
                      <Button key={tone} variant="outline" size="sm">
                        {tone}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button className="w-full">Generate Content</Button>
              </div>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex items-center gap-2 pb-4">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <Textarea
                className="min-h-[300px] font-mono text-sm"
                placeholder="Your AI-generated content will appear here..."
                value=""
                readOnly
              />
              <div className="flex justify-end pt-4">
                <Button variant="outline">
                  <Icons.copy />
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </section> */}

        {/* Testimonials */}
        <section id="testimonials" className="container py-24 sm:py-32">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it - hear from our satisfied users
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                role: "Content Marketer",
                quote:
                  "Content Flow has cut my writing time in half while improving quality. It's like having a professional writer on my team.",
                avatar: "https://avatar.iran.liara.run/public/69",
              },
              {
                name: "Michael Chen",
                role: "Startup Founder",
                quote:
                  "As a non-native English speaker, Content Flow has been invaluable for creating polished, professional content.",
                avatar: "https://avatar.iran.liara.run/public/18",
              },
              {
                name: "Emily Rodriguez",
                role: "Blogger",
                quote:
                  "The SEO suggestions alone are worth the price. My traffic has increased by 40% since I started using Content Flow.",
                avatar: "https://avatar.iran.liara.run/public/56",
              },
            ].map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted">
                        <Avatar>
                          <AvatarImage
                            src={testimonial?.avatar}
                            alt={testimonial?.name}
                          />
                          <AvatarFallback>
                            {testimonial?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

        {/* CTA */}
        <section className="container py-24 sm:py-32">
          <div className="mx-auto max-w-4xl rounded-xl bg-primary/10 px-8 py-16 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Transform Your Writing?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Join thousands of creators who are writing better content faster
              with Content Flow.
            </p>
            <Button className="mt-8" size="lg" asChild>
              <Link href="/signup">Get Started for Free</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
