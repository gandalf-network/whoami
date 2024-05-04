"use client";

import { StoriesProps } from "@/types";

import { Stories } from "./base";
import { reportsStories } from "./reports";
import { statsStories } from "./stats";
import { UserDataProvider, useUserData } from "../providers/user";

export const UserStories = ({ stories, ...props }: Partial<StoriesProps>) => {
  const { reportCard } = useUserData();

  return (
    <UserDataProvider>
      <Stories
        width="100%"
        height="100%"
        stories={stories || [...statsStories, ...reportsStories]}
        key={`user-stories-${reportCard?.personality?.personality || "loading"}`}
        {...props}
      />
    </UserDataProvider>
  );
};
