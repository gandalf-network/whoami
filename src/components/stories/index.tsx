"use client";

import { useEffect } from "react";

import { StoriesProps } from "@/types";

import { Stories } from "./base";
import { reportsStories } from "./reports";
import { statsStories } from "./stats";
import { UserDataProvider, useUserData } from "../providers/user";

export const UserStories = ({ stories, ...props }: Partial<StoriesProps>) => {
  const { reportCard, stats } = useUserData();

  useEffect(() => {
    console.log({ stories: true, reportCard, stats });
  }, [stats, reportCard]);

  return (
    <UserDataProvider>
      <Stories
        width="100%"
        height="100%"
        stories={stories || [...statsStories, ...reportsStories]}
        {...props}
      />
    </UserDataProvider>
  );
};
