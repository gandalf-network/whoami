/* eslint-disable @next/next/no-img-element */
import { cn } from "@/helpers/utils";

import { HalfEclipse, QuadrilateralStar } from "../icon";
import {
  BluePinkWaveBackground,
  PageHeader,
  Text,
  TextAnimation,
} from "../themed";

export interface LoadingScreenProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string[];
}

export const LoadingScreen = ({
  className,
  title = "Hold tight...",
  description = [
    "Decoding your Netflix habits",
    "Crunching numbers for your TV Stats",
    "Crafting your TV Report Card",
    "Unveiling your binge persona soon",
  ],
  ...props
}: LoadingScreenProps) => {
  return (
    <div
      className={cn(
        "px-4 py-6 bg-background flex-col flex-center h-full overflow-hidden offset-content",
        className,
      )}
      {...props}
    >
      <PageHeader />

      <div className="flex-1 flex-center flex-col gap-2.5 mb-10 ">
        <img
          src="/loading.gif"
          className="w-16 h-16 object-cover"
          alt="loading animation"
        />

        <Text className="text-lg font-medium">{title}</Text>
        <TextAnimation texts={description} className="text-lg font-medium" />
      </div>

      <QuadrilateralStar
        className="absolute w-24 bottom-[30%] -left-8 opacity-50 pointer-events-none"
        strokeWidth={1}
      />

      <HalfEclipse
        className="absolute w-28 top-[10%] -right-12 opacity-50 pointer-events-none rotate-180"
        strokeWidth={1}
      />

      <BluePinkWaveBackground className="justify-end z-10 pointer-events-none" />
    </div>
  );
};

interface LoaderProps {
  children?: React.ReactNode;
  loading?: boolean;
}

export const Loader = ({ children, loading }: LoaderProps) => {
  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};