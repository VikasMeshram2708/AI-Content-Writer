import { getServerSession } from "next-auth";
import { options } from "./utils/options";

export default async function Home() {
  const session  = await getServerSession(options)

  return (
    <div className="min-h-screen bg-background">
      <h2>Home Page</h2>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </div>
  );
}
