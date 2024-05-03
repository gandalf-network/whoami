import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

import OGImage from "@/components/images/opengraph";
import { AllStoryIds } from "@/types";

export const runtime = "edge";

const fontMedium = fetch(
  new URL("/public/fonts/poppins/medium.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const fontSemibold = fetch(
  new URL("/public/fonts/poppins/semibold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const font = fetch(
  new URL("/public/fonts/opensans/regular.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  try {
    const fontData = await font;
    const fontMediumData = await fontMedium;
    const fontSemiboldData = await fontSemibold;

    const { searchParams } = new URL(request.url);

    const id = (searchParams.get("id") || "") as AllStoryIds;
    const data = searchParams.get("data") || "";

    return new ImageResponse(<OGImage id={id} data={data} />, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "opensans",
          data: fontData,
          style: "normal",
          weight: 400,
        },
        {
          name: "poppins",
          data: fontMediumData,
          style: "normal",
          weight: 500,
        },
        {
          name: "poppins",
          data: fontSemiboldData,
          style: "normal",
          weight: 600,
        },
      ],
    });
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
