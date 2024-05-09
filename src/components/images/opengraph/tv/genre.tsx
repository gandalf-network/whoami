/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  ogImageStlyingColors,
  ogImageStlyingUrls,
  ogStyles,
} from "@/helpers/metadata";
import { getHighestPercentageGenre } from "@/helpers/story";
import { OpenGraphImageProps, TopGenres } from "@/types";

import { OGContainer, OGGridLayout, OGText, OGVisualLayout } from "../base";

export interface FirstTVShowOGImageProps extends OpenGraphImageProps {
  genres: TopGenres;
}

export const TVGenreOGImage = ({
  style,
  genres,
  ...props
}: FirstTVShowOGImageProps) => {
  const topGenre = getHighestPercentageGenre(genres);

  return (
    <OGContainer>
      <OGVisualLayout
        bg={ogImageStlyingColors.orange}
        style={{
          backgroundImage: `url(${ogImageStlyingUrls.tvGenreBg})`,
          flexDirection: "column",
        }}
      >
        {genres.map((genre, index) => {
          const label = `${genre.genre} - ${genre.percentage}%`;
          return (
            <div
              key={`${label}-${index}`}
              style={{
                display: "flex",
                marginBottom: "0.75rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  border: "3px solid black",
                  borderRadius: "5rem",
                  height: "5rem",
                  width: "100%",
                  maxWidth: "400px",
                  overflow: "hidden",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    backgroundColor: ogImageStlyingColors.progress,
                    borderRight: "3px solid black",
                    width: `${genre.percentage}%`,
                    display: "flex",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  width: "100%",
                  maxWidth: "400px",
                  height: "100%",
                  zIndex: 99,
                  ...ogStyles.flexCenter,
                }}
              >
                <OGText
                  size="1.6rem"
                  style={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                >
                  {label}
                </OGText>
              </div>
            </div>
          );
        })}
      </OGVisualLayout>

      <OGGridLayout>
        <OGText size="2rem">My top TV genre is</OGText>
        <OGText size="2rem" style={{ fontWeight: 600 }}>
          {topGenre.genre}
        </OGText>
      </OGGridLayout>
    </OGContainer>
  );
};
