/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  ogImageStlyingColors,
  ogImageStlyingUrls,
  ogStyles,
} from "@/helpers/metadata";
import { OpenGraphImageProps } from "@/types";

import { OGContainer, OGGridLayout, OGText, OGVisualLayout } from "./base";

export interface CrossOverStarOGImageProps extends OpenGraphImageProps {
  name: string;
  imageUrl?: string;
}

export const CrossOverStarOGImage = ({
  style,
  name,
  imageUrl,
  ...props
}: CrossOverStarOGImageProps) => {
  return (
    <OGContainer>
      <OGVisualLayout
        style={{
          backgroundColor: ogImageStlyingColors.yellow,
          backgroundImage: `url(${ogImageStlyingUrls.starBg})`,
        }}
      >
        <div
          style={{
            ...ogStyles.flexCenterY,
            ...ogStyles.imageBox,
            width: "380px",
            height: "380px",
            borderRadius: "50%",
          }}
        >
          <img src={imageUrl} style={{ ...ogStyles.responsiveImage }} />
        </div>
      </OGVisualLayout>

      <OGGridLayout>
        <OGText size="2rem">My crossover star is</OGText>
        <OGText size="2rem" style={{ fontWeight: 600 }}>
          {name}{" "}
        </OGText>
      </OGGridLayout>
    </OGContainer>
  );
};
