import { getUserProfile } from "@/services/getUserProfile";
import { ProfileUser } from "../../../../../types/userProfileTypes";
import ProfileHeader from "@/components/profile/Header";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { getUserPosts } from "@/services/ge_tUser_Profile_Posts";

export default async function ProfilePage({ params }: ProfileUser) {
    const { userName } = await params;

    const profile = await getUserProfile(userName);

    const { user } = profile;

    const postsData = await getUserPosts(userName);

    return (
        <main className="mx-auto min-h-screen w-full">
            <ProfileHeader
                isOwnProfile={false}
                user={user}
            />

            <ProfileTabs
                user={user}
                isOwnProfile={false}
                posts={postsData.posts}
                allSavePost={[]}
            />
        </main>
    );
}