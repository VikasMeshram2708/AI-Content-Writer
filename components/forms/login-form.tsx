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
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormEvent, useState, useTransition } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [isPending, startTransition] = useTransition();

  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (!value.email.trim() || !value.password.trim()) {
          setErrorMessage("Please fill in all fields.");
          return;
        }

        // Clear any previous error message
        setErrorMessage("");

        const result = await signIn("credentials", {
          redirect: false,
          email: value.email,
          password: value.password,
        });

        if (result?.error) {
          setErrorMessage("Invalid email or password. Please try again.");
        } else if (result?.ok) {
          // Redirect on successful login
          window.location.href = "/on-board";
        }
      } catch (e) {
        setErrorMessage(
          (e as Error)?.message ?? "An unexpected error occurred.",
        );
      }
    });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Credentials or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              <Button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/on-board" })}
                variant="outline"
                className="w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Login with Google
              </Button>

              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={value.email}
                    onChange={(e) =>
                      setValue({ ...value, email: e.target.value })
                    }
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    value={value?.password}
                    onChange={(e) =>
                      setValue({ ...value, password: e.target.value })
                    }
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <Loader2 className="animate-spin" /> : "Login"}
                </Button>
              </div>
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <div className="text-center text-sm">
                {"Don't"} have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Register
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
