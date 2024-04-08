/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ogImageStlyingUrls, ogStyles } from "@/helpers/metadata";
import { OpenGraphImageProps } from "@/types";

import { OGContainer, OGGridLayout, OGText, OGVisualLayout } from "../base";

export interface FirstTVShowOGImageProps extends OpenGraphImageProps {
  name: string;
  imageUrl?: string;
}

export const FirstTVShowOGImage = ({
  style,
  name,
  imageUrl,
  ...props
}: FirstTVShowOGImageProps) => {
  return (
    <OGContainer>
      <OGVisualLayout
        style={{ backgroundImage: `url(${ogImageStlyingUrls.firstTvBg})` }}
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
        <OGText size="2rem">My first TV show was</OGText>
        <OGText size="2rem" style={{ fontWeight: 600 }}>
          {name}{" "}
        </OGText>
      </OGGridLayout>
    </OGContainer>
  );
};
