import { Menu, NotepadText } from "lucide-react";
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
} from "./ui/sheet";

export default async function Navbar() {
  const session = await getServerSession(options);
  return (
    <nav className="bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap">
          <h2 className="flex items-center gap-2 text-2xl font-medium text-foreground">
            <NotepadText />
            <Link href="/">Content Flow</Link>
          </h2>
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent className="p-5">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-2xl font-medium text-foreground">
                  <NotepadText />
                  <Link href="/">Content Flow</Link>
                </SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col items-start gap-2 mt-4">
                {navLinks?.map((nl, idx) => (
                  <li
                    className="capitalize hover:bg-primary/20 px-4 py-2 hover:transition-colors rounded-lg text-sm font-medium text-muted-foreground inline-block w-full"
                    key={idx}
                  >
                    <Link href={nl.href}>{nl.name}</Link>
                  </li>
                ))}
              </ul>
              {session ? (
                <div className="mt-4">
                  <span className="text-sm">
                    Hello, {session.user?.name || session.user?.email}
                  </span>
                  <Button variant={"link"} className="mt-2">
                    <Link href="/api/auth/signout">Logout</Link>
                  </Button>
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-2">
                  <Button variant={"link"}>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button>
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
          <ul className="hidden lg:flex items-center gap-2">
            {navLinks?.map((nl, idx) => (
              <li
                className="capitalize hover:bg-primary/20 px-4 py-2 hover:transition-colors rounded-lg text-sm font-medium text-muted-foreground inline-block mr-4"
                key={idx}
              >
                <Link href={nl.href}>{nl.name}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex items-center gap-4">
            {session ? (
              <>
                <span className="text-sm">
                  Hello, {session.user?.name || session.user?.email}
                </span>
                <Button variant={"link"}>
                  <Link href="/api/auth/signout">Logout</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant={"link"}>
                  <Link href="/login">Login</Link>
                </Button>
                <Button>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
