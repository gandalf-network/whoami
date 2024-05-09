"use client";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarProps } from "react-circular-progressbar/dist/types";

export const ThemedCircularProgress = (props: CircularProgressbarProps) => {
  return <CircularProgressbar {...props} />;
};
