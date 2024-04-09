"use client";

import { useEffect, useState } from "react";

import { cn } from "@/helpers/utils";

export interface ProgressProps
  extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export const Progress = ({
  label,
  className,
  containerClassName,
  labelClassName,
  value,
  ...props
}: ProgressProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // trigger animation on loader
    if (value) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          // Increment progress by 10 every second
          const newProgress = prevProgress + 1;
          // Clear interval and set progress to 100 when it reaches 100
          if (newProgress >= +value) {
            clearInterval(interval);
            return +value;
          }
          return newProgress;
        });
      }, 20);

      return () => clearInterval(interval);
    }
  }, []);
  return (
    <div className={cn("relative w-full", containerClassName)}>
      {label && (
        <div className="absolute w-full h-full left-0 flex-center">
          <p className={cn("text-center font-bold text-xl", className)}>
            {label}
          </p>
        </div>
      )}
      <progress
        className={cn("themed-progress", className)}
        value={progress}
        {...props}
      />
    </div>
  );
};