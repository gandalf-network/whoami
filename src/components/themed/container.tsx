import { cn } from "@/helpers/utils";

import { StoryFooter } from "./footer";
import { Text } from "./text";

// A component that wraps its children in a div with a max-width of medium screen.
export const MobileView = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "w-full md:max-w-[420px] md:rounded-xl bg-background outline-none overflow-x-auto",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const Container = ({
  children,
  className,
  containerClassName,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { containerClassName?: string }) => {
  return (
    <div
      className={cn(
        "story-container flex justify-center bg-gray-200 md:p-4",
        containerClassName,
      )}
      {...props}
    >
      <MobileView className={className}>{children}</MobileView>
    </div>
  );
};

export const Box = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "px-4 py-2.5 border-2 rounded-full shadow-black bg-background",
        className,
      )}
      {...props}
    />
  );
};

export const Circle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "w-12 h-12 border-2 rounded-full shadow-black bg-background",
        className,
      )}
      {...props}
    />
  );
};

export const BulletPoint = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("w-2 h-2 rounded-full bg-black", className)}
      {...props}
    />
  );
};

export const StoryDownloadContainer = ({
  children,
  className,
  title,
  titleClassName,
  description,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  titleClassName?: string;
  description?: string;
}) => {
  return (
    <div
      className={cn(
        "py-6 px-4 bg-primary-purple w-[375px] h-[666px] flex-col hidden absolute top-0 left-0 -z-10",
        className,
      )}
      {...props}
    >
      {title && (
        <div
          className={cn(
            "text-2xl text-center max-w-[80%] mx-auto",
            titleClassName,
          )}
        >
          <Text font="heading" className="uppercase">
            {title}
          </Text>
          {description && (
            <Text className="text-lg mt-8 font-medium">{description}</Text>
          )}
        </div>
      )}
      <div className="flex-1 flex">{children}</div>
      <StoryFooter className="relative z-50" />
    </div>
  );
};
