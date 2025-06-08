import { getServerSession } from "next-auth";
import { options } from "@/app/utils/options";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  // if (!session.user.isOnboarded) {
  //   redirect("/on-board");
  // }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to Content Flow!</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {session.user.name}
            </p>
            <p>
              <strong>Email:</strong> {session.user.email}
            </p>
            {session.user.image && (
              <div>
                <strong>Profile Picture:</strong>
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full mt-2"
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-8">
          {session?.user?.isOnboarded ? (
            <Link href="/chat">
              <Button>Continue to Chat</Button>
            </Link>
          ) : (
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                🎉 Onboarding Complete!
              </h2>
              <p className="text-gray-700">
                Great! You&apos;ve successfully completed the onboarding process.
                This is where your main chat feature and content creation tools
                will be.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
