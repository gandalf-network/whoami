"use client";

import { StoriesProps } from "@/types";

import { Stories } from "./base";
import { reportsStories } from "./reports";
import { statsStories } from "./stats";
import { UserDataProvider } from "../providers/user";

export const UserStories = ({ stories, ...props }: Partial<StoriesProps>) => {
  return (
    <UserDataProvider>
      <Stories
        width="100%"
        height="100%"
        stories={stories || [...statsStories, ...reportsStories]}
        defaultInterval={10000}
        {...props}
      />
    </UserDataProvider>
  );
};
