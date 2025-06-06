import { NotepadText } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import { options } from "@/app/utils/options";

export default async function Navbar() {
  const session = await getServerSession(options);
  return (
    <nav className="bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap">
          <h2 className="flex items-center gap-2 text-2xl font-medium text-foreground">
            <NotepadText />
            <Link href="/">Navbar</Link>
          </h2>
          <div className="flex items-center gap-4">
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
