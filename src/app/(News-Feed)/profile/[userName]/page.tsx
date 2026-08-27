import { headers } from "next/headers";

import { getUserProfile } from "@/services/getUserProfile";
import { ProfileUser } from "../../../../../types/userProfileTypes";
import ProfileHeader from "@/components/profile/Header";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { getUserPosts } from "@/services/ge_tUser_Profile_Posts";
import { auth } from "@/lib/auth";

export default async function ProfilePage({  params, }: ProfileUser) {
    const { userName } = await params;

    const profile = await getUserProfile(userName);

    const { user } = profile;

    const postsData = await getUserPosts(userName);

    const session = await auth.api.getSession({
            headers: await headers(),
        });

    const isOwnProfile = session?.user?.id === user.id;

    return (
        <main className="mx-auto min-h-screen w-full max-w-2xl">

            <ProfileHeader
                user={user}
                isOwnProfile={isOwnProfile}
            />

            <ProfileTabs
                user={user}
                isOwnProfile={isOwnProfile}
                posts={postsData.posts}
                allSavePost={[]}
            />

        </main>
    );
}