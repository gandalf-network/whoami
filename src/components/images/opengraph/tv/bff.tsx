/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  ogImageStlyingColors,
  ogImageStlyingUrls,
  ogStyles,
} from "@/helpers/metadata";
import { OpenGraphImageProps } from "@/types";

import { OGContainer, OGGridLayout, OGText, OGVisualLayout } from "../base";

export interface TvBFFOGImageProps extends OpenGraphImageProps {
  name: string;
  show: string;
  imageUrl?: string;
}

export const TvBFFOGImage = ({
  style,
  show,
  name,
  imageUrl,
  ...props
}: TvBFFOGImageProps) => {
  return (
    <OGContainer>
      <OGVisualLayout
        bg={ogImageStlyingColors.blue}
        style={{ backgroundImage: `url(${ogImageStlyingUrls.tvBFFBg})` }}
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
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <OGText size="2rem">My TV BFF is </OGText>
          <OGText size="2rem" style={{ fontWeight: 600 }}>
            {name}
          </OGText>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <OGText size="2rem">from</OGText>
          <OGText size="2rem" style={{ fontWeight: 600 }}>
            {" "}
            “{show}”
          </OGText>
        </div>
      </OGGridLayout>
    </OGContainer>
  );
};
