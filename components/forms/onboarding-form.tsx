"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState, useTransition } from "react";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function OnboardingForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState({
    name: session?.user?.name || "",
    picture: "",
  });
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    
    startTransition(async () => {
      try {
        const response = await fetch("/api/user/onboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: value.name,
            picture: value.picture,
          }),
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Redirect to main app/dashboard after successful onboarding
          router.push("/dashboard"); // or wherever your main app is
        } else {
          setError(result.error?.fieldErrors ? "Please check your inputs" : result.error);
        }
      } catch (e) {
        setError((e as Error)?.message ?? "Something went wrong.");
      }
    });
  }

  return (
    <div className={cn("flex flex-col gap-6 max-w-md mx-auto", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Content Flow!</CardTitle>
          <CardDescription>
            Let's set up your profile to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="grid gap-3">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  value={value.name}
                  onChange={(e) =>
                    setValue({ ...value, name: e.target.value })
                  }
                  id="name"
                  type="text"
                  placeholder="How should we call you?"
                  required
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="picture">Profile Picture URL (Optional)</Label>
                <div className="relative">
                  <Input
                    value={value.picture}
                    onChange={(e) =>
                      setValue({ ...value, picture: e.target.value })
                    }
                    id="picture"
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                  />
                  <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">
                  You can add a profile picture URL or skip this for now
                </p>
              </div>
              
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

