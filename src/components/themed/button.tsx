import { Loader2 } from "lucide-react";

import { cn } from "@/helpers/utils";
import { ButtonProps } from "@/types";

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  ...props
}: ButtonProps) => {
  // extends this variable to add multiple button styles
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-cyan",
    link: "bg-transparent text-black underline border-0 rounded-none shadow-none",
  };

  const sizes = {
    md: "px-8 py-3 text-xl shadow-[4px_2px]",
    sm: "px-6 py-2 text-lg shadow-[4px_2px]",
    lg: "px-10 py-5 text-2xl shadow-[4px_2px]",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(
        "font-medium inline-flex items-center justify-center gap-x-2 whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none border rounded-[50%] shadow-black",
        sizes[size],
        variants[variant],
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className,
      )}
      {...props}
    >
      {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : children}
    </button>
  );
};
