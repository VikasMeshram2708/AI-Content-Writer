"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, NotepadText, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  console.log("isUserMenuOpen", isUserMenuOpen);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const session = null; // User is not logged in

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Generate", href: "/generate" },
    { name: "Templates", href: "/templates" },
    { name: "Analytics", href: "/analytics" },
    { name: "Pricing", href: "/pricing" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-primary to-secondary opacity-0 transition-all duration-300 blur group-hover:opacity-20" />
                  <NotepadText className="relative h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                  Content Flow
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-all duration-200 group hover:bg-muted"
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200" />
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {session ? (
                <div className="relative" ref={userMenuRef}>
                  {/* user avatar + menu */}
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-3">
                  <a
                    href="/login"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "text-sm"
                    )}
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" }),
                      "text-sm px-4 py-2"
                    )}
                  >
                    Get Started
                  </a>
                </div>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/25 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 h-full w-80 bg-background shadow-xl transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <NotepadText className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold text-foreground">
                    Content Flow
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 px-6 py-6 overflow-y-auto">
                <nav className="space-y-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="border-t p-6">
                <div className="space-y-3">
                  <Link
                    href="/signup"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-full text-sm bg-gradient-to-r from-primary to-secondary"
                    )}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/login"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full text-sm"
                    )}
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-16" />
    </>
  );
}
