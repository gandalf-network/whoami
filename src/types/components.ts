import { type Options } from "qr-code-styling";

import { AlertDialog } from "@/components/ui/alert-dialog";

import { Action, AllStoryIds } from "./story";

export type SliderOptionType = {
  value: string;
  content: React.ReactNode;
};

export interface VerticalSliderProps {
  options: SliderOptionType[];
  value?: string;
  containerClassName?: string;
  className?: string;
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  font?: "heading" | "caption";
}

export interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  iconClassName?: string;
}

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  disabled?: boolean;
}

export type ShareStoryProps = {
  id: AllStoryIds;
  action?: Action;
  isPaused?: boolean;
  info?: any;
};

export interface ShareButtonProps extends ButtonProps {
  storyProps: ShareStoryProps;
}

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  storyProps?: {
    action?: Action;
    isPaused?: boolean;
  };
}

export interface ProgressProps
  extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export interface DialogProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  children?: React.ReactNode;

  /**Function */
  onOverlayClick?: () => void;

  /**Element */
  triggerElement?: React.ReactNode;

  /**class name */
  contentClassName?: string;
}

export interface QRCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  options?: Options;
}
