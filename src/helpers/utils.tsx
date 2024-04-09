import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// this is a utility function that merges the tailwind classes with the clsx classes
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// this is a utility function that checks if the current environment is production
export const isProduction = () => process.env.NODE_ENV === "production";

// this is a utility function that appends the protocol to the url
export const appendProtocolToUrl = (url: string) => {
  return url.startsWith("https:") || url.startsWith("http:")
    ? url
    : `https://${url}`;
};

// this is a utility function that gets the environment details
export const getEnvDetails = () => {
  const url = isProduction()
    ? process.env.NEXT_PUBLIC_VERCEL_URL || ""
    : process.env.NEXT_PUBLIC_VERCEL_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "";

  const sterilizeUrl = url ? new URL(appendProtocolToUrl(url)) : undefined;

  const host = sterilizeUrl?.host;

  const protocol = host?.includes("localhost") ? "http" : "https";

  return {
    host,
    protocol,
    url: `${protocol}://${host}`,
  };
};

// this is a utility function that gets the app info
export const appInfo = {
  repoUrl: "https://github.com/gandalf-network/whoami",
  deployUrl:
    "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgandalf-network%2Fwhoami&env=NEXT_PUBLIC_GANDALF_PUBLIC_KEY,GANDALF_PRIVATE_KEY&envDescription=Environment%20variables%20for%20the%20Gandalf%20API&envLink=https%3A%2F%2Fgandalf-api.com%2Fdashboard&project-name=whoami&repository-name=whoami",
  connectUrl: `https://auth.gandalf.network/?services={%22netflix%22:true}&redirectUrl=${process.env.NEXT_PUBLIC_VERCEL_URL}&publicKey=${process.env.NEXT_PUBLIC_GANDALF_PUBLIC_KEY}`,
};

/**
 * this method format an array of string to sentence
 * @param strings e.g. ["alex", "brain", "charles"]
 * @returns "alex, brain, and charles"
 */
export const formatStringArrayToJSX = ({
  strings,
  className,
}: {
  strings: string[];
  className?: string;
}) => {
  // Check if the array is empty
  if (strings.length === 0) {
    return null;
  } else if (strings.length === 1) {
    return <span className={className}>{strings[0]}</span>;
  } else if (strings.length === 2) {
    return (
      <>
        <span className={className}>{strings[0]}</span> and{" "}
        <span className={className}>{strings[1]}</span>
      </>
    );
  } else {
    return strings.map((str, index) => {
      const isLastItem = index === strings.length - 1;
      return (
        <>
          {isLastItem && <>and </>}
          <span className={className}>
            {str}
            {isLastItem ? "" : ", "}
          </span>
        </>
      );
    });
  }
};

// this is a utility function that checks if the window is defined
export const isWindowDefined = () => typeof window !== "undefined";