import { NotepadText } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap">
          <h2 className="flex items-center gap-2 text-2xl font-medium text-foreground">
            <NotepadText />
            <Link href="/">Navbar</Link>
          </h2>
          <div className="flex items-center gap-4">
            <Button variant={"link"}>Login</Button>
            <Button>Register</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
