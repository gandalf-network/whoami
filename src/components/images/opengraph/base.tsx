import {
  LogoIcon,
  LogoMarkOutlinedIcon,
  PoweredByGandalfIcon,
} from "@/components/icon";
import { ogImageStlyingUrls } from "@/helpers/metadata";
import {
  OpenGraphImageProps,
  OpenGraphLogoProps,
  OpenGraphTextProps,
} from "@/types";

export const OGText = ({
  font = "poppins",
  size = "1.2rem",
  align,
  style,
  ...props
}: OpenGraphTextProps) => {
  return (
    <p
      style={{
        fontSize: size,
        fontFamily: font,
        ...(style || {}),
      }}
      {...props}
    />
  );
};

export const OGLogo = ({
  iconSize = { width: "100px", height: "100px" },
  size = { width: "500px", height: "100px" },
}: OpenGraphLogoProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <LogoIcon style={{ width: iconSize.width, height: iconSize.height }} />
      <LogoMarkOutlinedIcon
        style={{ width: size.width, height: size.height }}
      />
    </div>
  );
};

export const OGPoweredByLogo = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
        height: "44px",
        width: "300px",
        borderRadius: "300px",
        border: "2.5px solid #000",
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "8px",
          background: "#000",
        }}
      />
      <PoweredByGandalfIcon style={{ width: "160px", height: "16px" }} />
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "8px",
          background: "#000",
        }}
      />
    </div>
  );
};

export const BaseOGImage = ({ style, ...props }: OpenGraphImageProps) => {
  return (
    <div
      style={{
        display: "flex",
        width: "1200px",
        height: "675px",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        textAlign: "center",
        backgroundColor: "#fff",
        backgroundImage: `url(${ogImageStlyingUrls.grid})`,
        ...(style || {}),
      }}
      {...props}
    >
      <div style={{ display: "flex", marginBottom: "3rem" }}>
        <OGPoweredByLogo />
      </div>

      <OGLogo />

      <OGText style={{ maxWidth: "560px", marginTop: "1rem" }} size="2rem">
        Connect your Netflix profile and we will tell you who you are
      </OGText>

      {/* <GridLineBackground /> */}
    </div>
  );
};
