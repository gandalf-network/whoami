import { cn } from "@/helpers/utils";
import { BackgroundProps } from "@/types";

import {
  BluePinkWave,
  BluePinkWave1,
  BlueWave,
  GridLineIcon,
  PinkWave,
} from "../icon";

export const GridLineBackground = ({
  iconClassName,
  className,
  ...props
}: BackgroundProps) => {
  return (
    <div className={cn("inset-background", className)} {...props}>
      <GridLineIcon className={cn("w-full h-full", iconClassName)} />
    </div>
  );
};

export const BlueWaveBackground = ({
  iconClassName,
  className,
  ...props
}: BackgroundProps) => {
  return (
    <div
      className={cn("inset-background flex flex-col items-center", className)}
      {...props}
    >
      <BlueWave className={cn("w-full", iconClassName)} />
    </div>
  );
};

export const PinkWaveBackground = ({
  iconClassName,
  className,
  ...props
}: BackgroundProps) => {
  return (
    <div
      className={cn("inset-background flex flex-col items-center", className)}
      {...props}
    >
      <PinkWave className={cn("w-full", iconClassName)} />
    </div>
  );
};

export const BluePinkWaveBackground = ({
  iconClassName,
  className,
  ...props
}: BackgroundProps) => {
  return (
    <div
      className={cn("inset-background flex flex-col items-center", className)}
      {...props}
    >
      <BluePinkWave className={cn("w-full", iconClassName)} />
    </div>
  );
};

export const BluePinkWave1Background = ({
  iconClassName,
  className,
  ...props
}: BackgroundProps) => {
  return (
    <div
      className={cn("inset-background flex flex-col items-center", className)}
      {...props}
    >
      <BluePinkWave1 className={cn("w-full", iconClassName)} />
    </div>
  );
};
