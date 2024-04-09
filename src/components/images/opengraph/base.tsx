import {
  LogoIcon,
  LogoMarkOutlinedIcon,
  PoweredByGandalfIcon,
} from "@/components/icon";
import {
  ogImageStlyingColors,
  ogImageStlyingUrls,
  ogStyles,
} from "@/helpers/metadata";
import {
  OpenGraphImageProps,
  OpenGraphLogoProps,
  OpenGraphTextProps,
} from "@/types";

// --- OGText ---
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

// --- OG Whoami Logo ---
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

// --- OG Powered By Gandalf Logo ---
export const OGPoweredByLogo = () => {
  return (
    <div
      style={{
        ...ogStyles.flexCenterY,
        background: ogImageStlyingColors.white,
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

// --- OG Grid Visual Layout ---
export const OGVisualLayout = ({
  style,
  children,
  bg = ogImageStlyingColors.cyan,
}: React.HTMLAttributes<HTMLDivElement> & { bg?: string }) => {
  return (
    <div
      style={{
        ...ogStyles.flexCenter,
        height: "100%",
        width: "47%",
        background: bg,
        backgroundRepeat: "no-repeat",
        ...(style || {}),
      }}
    >
      {children}
    </div>
  );
};

// --- OG Grid Layout ---
export const OGGridLayout = ({
  children,
  style,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      style={{
        ...ogStyles.flexColumn,
        ...ogStyles.flexCenter,
        height: "100%",
        width: "53%",
        backgroundColor: ogImageStlyingColors.white,
        backgroundImage: `url(${ogImageStlyingUrls.gridPlain})`,
        justifyContent: "center",
        padding: "3rem",
        ...style,
      }}
    >
      <div style={{ display: "flex" }}>
        <OGPoweredByLogo />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <div
          style={{ flex: 1, ...ogStyles.flexCenter, flexDirection: "column" }}
        >
          <div style={{ display: "flex", margin: "2rem 0" }}>
            <OGLogo
              iconSize={{ width: "48px", height: "48px" }}
              size={{ width: "250px", height: "48px" }}
            />
          </div>
          {children}
        </div>

        <OGText
          size="1.7rem"
          font="opensans"
          style={{
            textAlign: "center",
            maxWidth: "350px",
            marginBottom: "2rem",
          }}
        >
          Connect your Netflix profile to find out yours!
        </OGText>
      </div>
    </div>
  );
};

export const OGContainer = ({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      style={{
        ...ogStyles.flexCenter,
        backgroundColor: ogImageStlyingColors.white,
        width: "1200px",
        height: "675px",
        ...(style || {}),
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const BaseOGImage = ({ style, ...props }: OpenGraphImageProps) => {
  return (
    <OGContainer
      style={{
        backgroundColor: "#fff",
        backgroundImage: `url(${ogImageStlyingUrls.grid})`,
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", marginBottom: "3rem" }}>
        <OGPoweredByLogo />
      </div>

      <OGLogo />

      <OGText
        style={{ maxWidth: "560px", marginTop: "1rem", textAlign: "center" }}
        size="2rem"
      >
        Connect your Netflix profile and we will tell you who you are
      </OGText>
    </OGContainer>
  );
};
