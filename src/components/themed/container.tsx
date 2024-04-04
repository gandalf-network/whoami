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
        "w-full md:max-w-md md:rounded-xl bg-background outline-none overflow-x-auto",
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
