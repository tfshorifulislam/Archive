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
    isOwnProfile: boolean;
}

export interface ProfileTabsProps {
    userName: string;
    isOwnProfile: boolean;
}