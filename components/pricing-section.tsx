// components/pricing-section.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <div className="mx-auto max-w-4xl space-y-6 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-muted-foreground">
          Choose the plan that fits your needs. No hidden fees.
        </p>
      </div>
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: "Starter",
            price: "$9",
            period: "per month",
            description:
              "Perfect for individuals getting started with AI content",
            features: [
              "10,000 words/month",
              "Basic templates",
              "Standard AI models",
              "Email support",
            ],
            cta: "Get Started",
          },
          {
            name: "Professional",
            price: "$29",
            period: "per month",
            description: "For professionals and small teams",
            features: [
              "50,000 words/month",
              "All templates",
              "Advanced AI models",
              "SEO tools",
              "Priority support",
            ],
            cta: "Most Popular",
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "For large teams and organizations",
            features: [
              "Unlimited words",
              "All features",
              "Dedicated AI models",
              "API access",
              "Dedicated account manager",
              "Custom integrations",
            ],
            cta: "Contact Sales",
          },
        ].map((plan) => (
          <Card
            key={plan.name}
            style={{
              position: "relative",
            }}
            className={plan.popular ? "border-primary shadow-lg" : ""}
          >
            <CardHeader
              className={plan.popular ? "border-b border-primary" : ""}
            >
              {plan.popular && (
                <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
              )}
              <CardTitle>{plan.name}</CardTitle>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                size="lg"
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
