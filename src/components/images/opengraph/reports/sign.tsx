/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { StarSignIcon } from "@/components/icon";
import { ogImageStlyingColors } from "@/helpers/metadata";
import { OpenGraphImageProps } from "@/types";

import { OGContainer, OGGridLayout, OGText, OGVisualLayout } from "../base";

export interface StarSignOGImageProps extends OpenGraphImageProps {
  name: string;
}

export const StarSignOGImage = ({
  style,
  name,
  ...props
}: StarSignOGImageProps) => {
  return (
    <OGContainer>
      <OGVisualLayout bg={ogImageStlyingColors.blue}>
        <StarSignIcon sign={name} style={{ width: "470px", height: "470px" }} />
      </OGVisualLayout>

      <OGGridLayout>
        <OGText size="2rem">My real star sign is </OGText>
        <OGText size="2rem" style={{ fontWeight: 600 }}>
          {name}{" "}
        </OGText>
      </OGGridLayout>
    </OGContainer>
  );
};
