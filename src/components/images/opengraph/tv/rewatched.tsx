/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  ogImageStlyingColors,
  ogImageStlyingUrls,
  ogStyles,
} from "@/helpers/metadata";
import { OpenGraphImageProps } from "@/types";

import { OGContainer, OGGridLayout, OGText, OGVisualLayout } from "../base";

export interface MostWatchedOGImageProps extends OpenGraphImageProps {
  name: string;
  imageUrl?: string;
}

export const MostWatchedOGImage = ({
  style,
  name,
  imageUrl,
  ...props
}: MostWatchedOGImageProps) => {
  return (
    <OGContainer>
      <OGVisualLayout
        bg={ogImageStlyingColors.green}
        style={{ backgroundImage: `url(${ogImageStlyingUrls.mostWatchedBg})` }}
      >
        <div
          style={{
            ...ogStyles.flexCenterY,
            ...ogStyles.imageBox,
          }}
        >
          <img src={imageUrl} style={{ ...ogStyles.responsiveImage }} />
        </div>
      </OGVisualLayout>

      <OGGridLayout>
        <OGText size="2rem">My most watched TV</OGText>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <OGText size="2rem">show is</OGText>
          <OGText size="2rem" style={{ fontWeight: 600 }}>
            {" "}
            {name}
          </OGText>
        </div>
      </OGGridLayout>
    </OGContainer>
  );
};
