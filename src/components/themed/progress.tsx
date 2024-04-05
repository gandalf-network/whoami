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
  ...props
}: ProgressProps) => {
  return (
    <div className={cn("relative w-full", containerClassName)}>
      {label && (
        <div className="absolute w-full h-full left-0 flex-center">
          <p className={cn("text-center font-bold text-xl", className)}>
            {label}
          </p>
        </div>
      )}
      <progress className={cn("custom-progress", className)} {...props} />
    </div>
  );
};
