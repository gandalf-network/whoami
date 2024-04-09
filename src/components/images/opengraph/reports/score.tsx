/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  ogImageStlyingColors,
  ogImageStlyingUrls,
  ogStyles,
} from "@/helpers/metadata";
import {
  getRottenTomatoeScoreText,
  rottenTomatoeImages,
  rottenTomatoeTexts,
} from "@/helpers/story";
import { OpenGraphImageProps } from "@/types";

import { OGContainer, OGGridLayout, OGText, OGVisualLayout } from "../base";

export interface RottenTomatoeOGImageProps extends OpenGraphImageProps {
  score: string;
}

export const RottenTomatoeOGImage = ({
  style,
  score,
  ...props
}: RottenTomatoeOGImageProps) => {
  const scoreText = getRottenTomatoeScoreText(+score).toLowerCase();

  const scoreAlignment = {
    "certified fresh": "flex-start",
    fresh: "center",
    rotten: "flex-end",
  };

  return (
    <OGContainer>
      <OGVisualLayout
        bg={ogImageStlyingColors.lavender}
        style={{ backgroundImage: `url(${ogImageStlyingUrls.scoreBg})` }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            height: "350px",
            marginLeft: "1rem",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "100%",
              background: ogImageStlyingColors.gray,
              border: "4px solid #000",
              width: "24px",
              borderRadius: "24px",
              boxShadow: "6px 8px #000 inset",
              display: "flex",
              justifyContent: "center",
              alignItems:
                scoreAlignment[
                  (scoreText as keyof typeof scoreAlignment) ||
                    "certified fresh"
                ],
              padding: "2rem 0",
            }}
          >
            <div
              style={{
                border: "2px solid #000",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: ogImageStlyingColors.white,
                boxShadow: "4px 4px #000",
              }}
            />
          </div>

          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1.4rem",
            }}
          >
            <div style={{ ...ogStyles.flexCenterY, gap: "0.5rem" }}>
              <img
                src={rottenTomatoeImages["certified fresh"]}
                alt="icon"
                style={{
                  width: "100px",
                }}
              />
              <OGText
                font="poppins"
                size="1.5rem"
                style={{ fontWeight: 600, textTransform: "uppercase" }}
              >
                {rottenTomatoeTexts["certified fresh"]}
              </OGText>
            </div>
            <div style={{ ...ogStyles.flexCenterY, gap: "0.5rem" }}>
              <img
                src={rottenTomatoeImages.fresh}
                alt="icon"
                style={{
                  width: "100px",
                }}
              />
              <OGText
                font="poppins"
                size="1.5rem"
                style={{ fontWeight: 600, textTransform: "uppercase" }}
              >
                {rottenTomatoeTexts.fresh}
              </OGText>
            </div>
            <div style={{ ...ogStyles.flexCenterY, gap: "0.5rem" }}>
              <img
                src={rottenTomatoeImages.rotten}
                alt="icon"
                style={{
                  width: "100px",
                }}
              />
              <OGText
                font="poppins"
                size="1.5rem"
                style={{ fontWeight: 600, textTransform: "uppercase" }}
              >
                {rottenTomatoeTexts.rotten}
              </OGText>
            </div>
          </div>
        </div>
      </OGVisualLayout>

      <OGGridLayout>
        <OGText size="2rem">My Rotten Tomatoes score is</OGText>
        <OGText size="2rem" style={{ fontWeight: 600 }}>
          {score}%
        </OGText>
      </OGGridLayout>
    </OGContainer>
  );
};
