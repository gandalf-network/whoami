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
        <div style={{ display: "flex" }}>
          <OGText size="2rem" style={{ paddingRight: "0.375rem" }}>
            My TV BFF is{" "}
          </OGText>
          <OGText size="2rem" style={{ fontWeight: 600 }}>
            {name}
          </OGText>
        </div>
        <OGText size="2rem" style={{ fontWeight: 600 }}>
          from “{show}”
        </OGText>
      </OGGridLayout>
    </OGContainer>
  );
};
