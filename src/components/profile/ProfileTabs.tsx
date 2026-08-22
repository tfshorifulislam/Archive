"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import { ProfileTabsProps } from "../../../types/userProfileTypes";

const ProfileTabs = ({
  isOwnProfile,
}: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="home" className="mt-8 w-full">
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

      <TabsContent value="home">
        {/* পরে ProfilePosts বসাবে */}
      </TabsContent>

      <TabsContent value="about">
        {/* পরে ProfileAbout বসাবে */}
      </TabsContent>

      {isOwnProfile && (
        <TabsContent value="saved">
          {/* পরে SavedPosts বসাবে */}
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ProfileTabs;