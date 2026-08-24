"use client";

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";

import { ProfileTabsProps } from "../../../types/userProfileTypes";

import About from "./About";
import ProfilePosts from "./ProfilePosts";

const ProfileTabs = ({
    isOwnProfile,
    user,
    posts,
}: ProfileTabsProps) => {
    return (
        <Tabs
            defaultValue="home"
            className="mt-8 w-full"
        >
            <TabsList className="h-auto rounded-none border-b bg-transparent p-0">

                <TabsTrigger
                    value="home"
                    className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                    Home
                </TabsTrigger>

                <TabsTrigger
                    value="about"
                    className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                    About
                </TabsTrigger>

                {isOwnProfile && (
                    <TabsTrigger
                        value="saved"
                        className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                        Saved
                    </TabsTrigger>
                )}

            </TabsList>

            {/* HOME */}
            <TabsContent value="home">
                <ProfilePosts posts={posts} />
            </TabsContent>

            {/* ABOUT */}
            <TabsContent value="about">
                <About user={user} />
            </TabsContent>

            {/* SAVED */}
            {isOwnProfile && (
                <TabsContent value="saved">
                    {/* SavedPosts */}
                </TabsContent>
            )}
        </Tabs>
    );
};

export default ProfileTabs;