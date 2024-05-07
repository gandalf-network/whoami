// this is a utility function that checks if the current environment is production
export const isProduction = () =>
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

// this is a utility function that appends the protocol to the url
export const appendProtocolToUrl = (url: string) => {
  return url.startsWith("https:") || url.startsWith("http:")
    ? url
    : `https://${url}`;
};

// this is a utility function that gets the environment details
export const getEnvDetails = () => {
  // this is the preview url
  const previewUrl =
    process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    "";

  // the staging details and url
  const isStaging = previewUrl.includes("staging");

  const stagingUrl = process.env.NEXT_PUBLIC_STAGING_URL || previewUrl;

  // production url
  const productionUrl =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || previewUrl;

  const url = isProduction()
    ? productionUrl
    : isStaging
      ? stagingUrl
      : previewUrl || process.env.NEXT_PUBLIC_APP_URL;

  const sterilizeUrl = url ? new URL(appendProtocolToUrl(url)) : undefined;

  const host = sterilizeUrl?.host;

  const protocol = host?.includes("localhost") ? "http" : "https";

  return {
    host,
    protocol,
    url: `${protocol}://${host}`,
  };
};
