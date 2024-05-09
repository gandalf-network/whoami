"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarProps } from "react-circular-progressbar/dist/types";

export const ThemedCircularProgress = (
  props: Partial<CircularProgressbarProps>,
) => {
  const { value = 0, strokeWidth = 10, styles, ...rest } = props;
  return (
    <CircularProgressbar
      styles={{
        ...buildStyles({
          trailColor: "#fff",
          pathColor: "#000",
        }),
        text: { fontSize: "2.5rem", fontWeight: "500", fill: "#000" },
        ...styles,
      }}
      strokeWidth={strokeWidth}
      value={value}
      {...rest}
    />
  );
};
