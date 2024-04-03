import { cn } from "@/helpers/utils";

// A component that wraps its children in a div with a max-width of medium screen.
export const MobileView = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "w-full md:max-w-md md:rounded-xl bg-background",
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
        "flex min-h-svh justify-center bg-gray-200 md:p-4",
        containerClassName,
      )}
      {...props}
    >
      <MobileView className={className}>{children}</MobileView>
    </div>
  );
};
