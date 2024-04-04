import { cn } from "@/helpers/utils";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "link";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  // extends this variable to add multiple button styles
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-cyan",
    link: "bg-transparent text-black underline border-none rounded-none shadow-none",
  };

  const sizes = {
    md: "px-8 py-3 text-xl shadow-[4px_2px]",
    sm: "px-6 py-2 text-lg",
    lg: "px-10 py-5 text-2xl",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-x-2 whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none border rounded-[50%] shadow-black",
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
