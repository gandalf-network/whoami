import { openSans, paytoneOne } from "@/helpers/fonts";
import { cn } from "@/helpers/utils";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  font?: "heading" | "caption";
}

export const Text = ({ font, className, ...props }: TextProps) => {
  const fontClassNames = {
    heading: paytoneOne.className,
    caption: openSans.className,
  };

  return (
    <p
      className={cn("text-2xl", font ? fontClassNames[font] : "", className)}
      {...props}
    />
  );
};
