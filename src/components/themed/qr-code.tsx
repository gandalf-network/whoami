"use client";

import { useRef } from "react";

import { useQrCode } from "@/hooks/use-qr-code";
import { QRCodeProps } from "@/types";

export const QRCode = ({ value, options, ...props }: QRCodeProps) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useQrCode({
    text: value,
    ref: qrCodeRef,
    qrOptions: options,
  });

  return <div {...props} ref={qrCodeRef} />;
};
