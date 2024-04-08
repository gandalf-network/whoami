export type ShareMediumType = "download" | "tiktok" | "instagram" | "copy";

export interface OpenGraphImageProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface OpenGraphTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  font?: "poppins" | "opensans";
  size?: string;
  align?: "center" | "left" | "right";
}

export interface OpenGraphLogoProps {
  iconSize?: {
    width: string;
    height: string;
  };
  size?: {
    width: string;
    height: string;
  };
}

export interface OGPoweredByLogoProps {}
