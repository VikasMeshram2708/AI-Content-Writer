import { Menu, NotepadText, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import { options } from "@/app/utils/options";
import { navLinks } from "@/data";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

export default async function Navbar() {
  const session = await getServerSession(options);
  const userInitials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "U";

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Home"
            >
              <NotepadText className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Content Flow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-1">
              {navLinks.map((nl, idx) => (
                <li key={idx}>
                  <Link
                    href={nl.href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    {nl.name}
                  </Link>
                </li>
              ))}
            </ul>

            {session ? (
              <div className="flex items-center gap-4 ml-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || undefined} />
                    <AvatarFallback className="text-xs">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Link href="/api/auth/signout">Logout</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-4">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation Trigger */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center gap-2">
                    <NotepadText className="h-6 w-6 text-primary" />
                    <span className="text-xl font-semibold">Content Flow</span>
                  </SheetTitle>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 -mr-2"
                      aria-label="Close menu"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>
              </SheetHeader>

              <div className="mt-8 flex flex-col h-[calc(100%-60px)]">
                <ul className="space-y-1">
                  {navLinks.map((nl, idx) => (
                    <li key={idx}>
                      <SheetClose asChild>
                        <Link
                          href={nl.href}
                          className={cn(
                            "block px-3 py-2 rounded-md text-base font-medium",
                            "text-muted-foreground hover:text-foreground hover:bg-accent",
                            "transition-colors"
                          )}
                        >
                          {nl.name}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8 border-t">
                  {session ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={session.user?.image || undefined} />
                          <AvatarFallback>{userInitials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {session.user?.name || session.user?.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Account
                          </p>
                        </div>
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/api/auth/signout">Sign Out</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button asChild className="w-full">
                        <Link href="/register">Create Account</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/login">Sign In</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
