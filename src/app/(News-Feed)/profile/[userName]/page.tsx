import { notFound } from "next/navigation";
import { getUserProfile } from "@/services/getUserProfile";
import { ProfileUser } from "../../../../../types/userProfileTypes";
import ProfileHeader from "@/components/profile/Header";
import ProfileTabs from "@/components/profile/ProfileTabs";



export default async function ProfilePage({ params }: ProfileUser) {
    const { userName } = await params;

    let profile;

    try {
        profile = await getUserProfile(userName);
    } catch {
        notFound();
    }

    const { user, isOwnProfile } = profile;

    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-6 min-h-screen">
            <ProfileHeader
                isOwnProfile={isOwnProfile}
                user={user} />

            <ProfileTabs
                userName={user.userName}
                isOwnProfile={isOwnProfile}
            />
        </main>
    );
}