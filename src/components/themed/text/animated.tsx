"use client";

import React, { useState, useEffect } from "react";

import { TextProps } from "@/types";

export const TextAnimation: React.FC<
  TextProps & { texts: string[]; duration?: number }
> = ({ texts, duration = 2000, ...props }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, duration);

    return () => clearInterval(interval);
  }, [texts.length]);

  if (texts[currentTextIndex] === undefined) return null;

  return <p {...props}>{texts[currentTextIndex]}</p>;
};
