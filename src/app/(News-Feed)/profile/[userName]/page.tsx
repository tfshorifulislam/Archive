import { notFound } from "next/navigation";

import { getUserProfile } from "@/services/getUserProfile";

import { ProfileUser } from "../../../../../types/userProfileTypes";

import ProfileHeader from "@/components/profile/Header";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { getUserPosts } from "@/services/ge_tUser_Profile_Posts";

export default async function ProfilePage({params,}: ProfileUser) {
    const { userName } = await params;

    let profile;

    try {
        profile = await getUserProfile(userName);
    } catch {
        notFound();
    }

    const { user, isOwnProfile } = profile;

    const postsData = await getUserPosts(userName);

    return (
        <main className="mx-auto min-h-screen w-full">
            <ProfileHeader
                isOwnProfile={isOwnProfile}
                user={user}
            />

            <ProfileTabs
                user={user}
                isOwnProfile={isOwnProfile}
                posts={postsData.posts}
            />
        </main>
    );
}