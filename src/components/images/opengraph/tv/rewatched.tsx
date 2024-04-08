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
        <OGText size="2rem">My most rewatched TV</OGText>
        <OGText size="2rem" style={{ fontWeight: 600 }}>
          show is {name}{" "}
        </OGText>
      </OGGridLayout>
    </OGContainer>
  );
};
