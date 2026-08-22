import { notFound } from "next/navigation";
import { getUserProfile } from "@/services/getUserProfile";

interface ProfilePageProps {
  params: Promise<{
    userName: string;
  }>;
}

export default async function ProfilePage({
  params,
}: ProfilePageProps) {
  const { userName } = await params;

  let profile;

  try {
    profile = await getUserProfile(userName);
  } catch {
    notFound();
  }

  const { user, isOwnProfile } = profile;

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex items-center gap-5">
        
        {/* Avatar */}
        <div className="size-24 overflow-hidden rounded-full bg-muted">
          {user.image && (
            <img
              src={user.image}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* User info */}
        <div>
          <h1 className="text-2xl font-bold">
            {user.name}
          </h1>

          <p className="text-muted-foreground">
            @{user.userName}
          </p>
        </div>

        {/* Action */}
        <div className="ml-auto">
          {isOwnProfile ? (
            <button className="rounded-md border px-4 py-2">
              Edit Profile
            </button>
          ) : (
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
              Follow
            </button>
          )}
        </div>
      </div>
    </main>
  );
}