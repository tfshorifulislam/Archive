import { Post, SavedPost } from "./createPost";

export type ProfileUser = {
    id: string;
    userName: string;
    name: string;
    image?: string | null;
    createdAt: string;
    params: Promise<{
        userName: string;
    }>;
};

export type UserProfileResponse = {
    success: boolean;
    user: ProfileUser;
    isOwnProfile: boolean;
};


export interface ProfileHeaderProps {
    user: ProfileUser;
}

export interface ProfileTabsProps {
    user: ProfileUser;
    isOwnProfile: boolean;
    posts: Post[];
    allSavePost: SavedPost[];
}

export interface AboutProps {
    user: ProfileUser;
}
