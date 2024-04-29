"use client";

import { useEffect, useState } from "react";

import { cn } from "@/helpers/utils";
import { VerticalSliderProps } from "@/types";

import { Circle } from "./container";

export const VerticalSlider = ({
  className,
  containerClassName,
  value: defaultValue,
  options,
  ...props
}: VerticalSliderProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // trigger animation on loader

    if (defaultValue) {
      const valuePosition = options.findIndex((v) => v.value === defaultValue);
      const valueOffsets = {
        0: 28, // certified fresh
        1: 22, // fresh
        2: 18, // rotten
      };
      const valueOffset =
        valueOffsets?.[valuePosition as keyof typeof valueOffsets] ||
        valueOffsets[2];

      const valueProgress =
        Math.round(100 / options.length) * (valuePosition + 1) - valueOffset;

      const interval = setInterval(() => {
        setValue((prevValue) => {
          // Increment progress by 10 every second
          const newProgress = prevValue + 1;
          // Clear interval and set progress to 100 when it reaches 100
          if (newProgress >= valueProgress) {
            clearInterval(interval);
            return valueProgress;
          }
          return newProgress;
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [defaultValue]);

  return (
    <div
      className={cn(
        "relative flex justify-center gap-x-3 h-56",
        containerClassName,
      )}
    >
      <div className="relative h-full w-4 bg-background border-2 shadow-black shadow-[4px_4px_inset] rounded-full">
        <Circle
          className={cn(
            "absolute top-0 left-2/4 -translate-x-1/2 w-7 h-7 shadow-[2px_2px] transition",
          )}
          style={{ top: `${value}%` }}
        />
      </div>

      <div className="h-full flex-1 flex flex-col justify-between items-start">
        {options.map((option, index) => {
          return <div key={`option-${index}`}>{option.content}</div>;
        })}
      </div>
    </div>
  );
};
