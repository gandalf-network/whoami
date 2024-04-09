/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { PentagramStar, UpArrow, Heart } from "@/components/icon";
import { ogImageStlyingColors, ogStyles } from "@/helpers/metadata";
import {
  getRottenTomatoeScoreText,
  rottenTomatoeImages,
} from "@/helpers/story";
import { OpenGraphImageProps } from "@/types";

import { OGContainer, OGGridLayout, OGText, OGVisualLayout } from "../base";

export interface ReportOverviewOGImageProps extends OpenGraphImageProps {
  score: string;
  tvBff?: string;
  star?: string;
  title?: string;
}

type OverviewSummary = {
  title: string;
  value: string;
  bg: string;
  icon: JSX.Element;
  divStyle?: React.CSSProperties;
};

export const ReportOverviewOGImage = ({
  title,
  style,
  score,
  tvBff,
  star,
  ...props
}: ReportOverviewOGImageProps) => {
  const overviewSummary: OverviewSummary[] = [
    {
      title: "Your Rotten Tomatoes Score is",
      value: `${score}%`,
      bg: ogImageStlyingColors.lavender,
      icon: (
        <div
          style={{
            display: "flex",
            marginTop: "-3rem",
            marginLeft: "-2.5rem",
          }}
        >
          <UpArrow style={{ width: "64px", height: "64px" }} />
        </div>
      ),
      divStyle: {
        marginTop: "-1.8rem",
      },
    },
    {
      title: "Your Tomatometer result is",
      value: getRottenTomatoeScoreText(+score),
      bg: ogImageStlyingColors.tomatoe,
      icon: (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "-2.75rem",
            marginLeft: "2rem",
          }}
        >
          <img
            style={{
              width: "3.25rem",
              transform: "rotate(16deg)",
            }}
            src={
              rottenTomatoeImages[
                getRottenTomatoeScoreText(
                  +score,
                ).toLowerCase() as keyof typeof rottenTomatoeImages
              ]
            }
            alt="img"
          />
        </div>
      ),
      divStyle: {
        marginTop: "-1.3rem",
      },
    },
    {
      title: "Your TV BFF is ",
      value: tvBff || "",
      bg: ogImageStlyingColors.purple,
      icon: (
        <div
          style={{
            display: "flex",
            marginTop: "-2rem",
            marginLeft: "-1.5rem",
          }}
        >
          <Heart style={{ width: "45px" }} />
        </div>
      ),
      divStyle: {
        marginTop: "-1.3rem",
      },
    },
    {
      title: "Your Real Star Sign is",
      value: star || "",
      bg: ogImageStlyingColors.blue,
      icon: (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "-2.5rem",
            marginLeft: "2.5rem",
          }}
        >
          <PentagramStar
            style={{
              width: "3.25rem",
              height: "3.25rem",
              transform: "rotate(15deg)",
            }}
            fill="#BBFCA2"
            strokeWidth={4}
          />
        </div>
      ),
      divStyle: {
        marginTop: "-1.5rem",
      },
    },
  ];

  return (
    <OGContainer>
      <OGVisualLayout bg={ogImageStlyingColors.white}>
        <div
          style={{
            ...ogStyles.flexCenter,
            flexDirection: "column",
            gap: "2rem",
            width: "100%",
          }}
        >
          {overviewSummary.map((summary, index) => {
            return (
              <div
                key={`summary-${index}`}
                style={{
                  // ...ogStyles.flexCenter,
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "450px",
                  padding: "1rem",
                  borderRadius: "1rem",
                  height: "110px",
                  backgroundColor: summary.bg,
                  boxShadow: "4px 4px #000",
                  border: "2px solid #000",
                  textAlign: "center",
                }}
              >
                {summary.icon}
                <div
                  style={{
                    ...ogStyles.flexCenter,
                    flexDirection: "column",
                    ...(summary.divStyle || {}),
                  }}
                >
                  <OGText font="poppins" size="1.25rem">
                    {summary.title}
                  </OGText>
                  <OGText
                    font="poppins"
                    style={{ fontWeight: 600, lineHeight: "1px" }}
                    size="1.6rem"
                  >
                    {summary.value as any}
                  </OGText>
                </div>
              </div>
            );
          })}
        </div>
      </OGVisualLayout>

      <OGGridLayout>
        <OGText size="2rem">My TV show persona is </OGText>
        <OGText size="2rem" style={{ fontWeight: 600 }}>
          {title}
        </OGText>
      </OGGridLayout>
    </OGContainer>
  );
};
