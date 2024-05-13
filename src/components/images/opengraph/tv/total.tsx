/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  ogImageStlyingColors,
  ogImageStlyingUrls,
  ogStyles,
} from "@/helpers/metadata";
import { OpenGraphImageProps } from "@/types";

import { OGContainer, OGGridLayout, OGText, OGVisualLayout } from "../base";

export interface TotalShowOGImageProps extends OpenGraphImageProps {
  count: string;
  images?: string[];
}

export const TotalShowOGImage = ({
  style,
  count,
  images,
  ...props
}: TotalShowOGImageProps) => {
  const firstShowImage = images?.[0];
  const secondShowImage = images?.[1] || "";
  const thirdShowImage = images?.[2] || "";

  return (
    <OGContainer>
      <OGVisualLayout
        bg={ogImageStlyingColors.pink}
        style={{
          width: "50%",
          backgroundImage: `url(${ogImageStlyingUrls.totalShowBg})`,
        }}
      >
        <div
          style={{
            ...ogStyles.flexCenterY,
            ...ogStyles.imageBox,
            marginRight: "1.5rem",
            width: "300px",
            height: "65%",
          }}
        >
          {firstShowImage && (
            <img src={firstShowImage} style={{ ...ogStyles.responsiveImage }} />
          )}
        </div>

        {secondShowImage || thirdShowImage ? (
          <div style={{ flexDirection: "column", ...ogStyles.flexCenterY }}>
            <div
              style={{
                ...ogStyles.flexCenterY,
                ...ogStyles.imageBox,
                height: "220px",
                width: "150px",
                marginBottom: "2rem",
              }}
            >
              {secondShowImage && (
                <img
                  src={secondShowImage}
                  style={{ ...ogStyles.responsiveImage }}
                />
              )}
            </div>

            <div
              style={{
                ...ogStyles.flexCenterY,
                ...ogStyles.imageBox,
                width: "150px",
                height: "220px",
              }}
            >
              {thirdShowImage && (
                <img
                  src={thirdShowImage}
                  style={{ ...ogStyles.responsiveImage }}
                />
              )}
            </div>
          </div>
        ) : null}
      </OGVisualLayout>

      <OGGridLayout style={{ width: "50%" }}>
        <OGText size="2rem">I have watched a total of </OGText>
        <OGText size="2rem" style={{ fontWeight: 600 }}>
          {count} TV show{+count > 1 ? "s" : ""}
        </OGText>
      </OGGridLayout>
    </OGContainer>
  );
};
