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
import SavedPosts from "../home/SavedPosts";

const ProfileTabs = ({
  isOwnProfile,
  user,
  posts,
  allSavePost,
}: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="home" className="mt-8 w-full">
      <TabsList className="h-auto rounded-none border-b bg-transparent p-0">
        {/* HOME */}
        <TabsTrigger
          value="home"
          className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Home
        </TabsTrigger>

        {/* ABOUT */}
        <TabsTrigger
          value="about"
          className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 shadow-none data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          About
        </TabsTrigger>
       
      </TabsList>

      {/* HOME CONTENT */}
      <TabsContent value="home">
        <ProfilePosts posts={posts} />
      </TabsContent>

      {/* ABOUT CONTENT */}
      <TabsContent value="about">
        <About user={user} />
      </TabsContent>

      {/* SAVED CONTENT */}
      {isOwnProfile && (
        <TabsContent value="saved">
          <SavedPosts allSavePost={allSavePost} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ProfileTabs;