import type { Options } from "qr-code-styling";
import { useEffect, useState } from "react";

interface QrCodeOptions {
  text: string;
  qrOptions?: Options;
  ref: React.RefObject<HTMLDivElement>;
  refetch?: boolean;
}

export const useQrCode = (options: QrCodeOptions) => {
  const { text = "", ref, refetch } = options;

  const textLength = text.length;

  const maxLengthForLMode = 271;

  const textSupportsLMode = textLength < maxLengthForLMode;

  const [qrOptions] = useState<Options>({
    width: 280,
    height: 280,
    data: text,
    margin: 0,
    // when text length is greater than max length for correct level l, use the default config
    qrOptions: textSupportsLMode
      ? {
          typeNumber: 10,
          mode: "Byte",
          errorCorrectionLevel: "L",
        }
      : {},
    cornersDotOptions: {
      color: "#000",
    },
    cornersSquareOptions: {
      type: "square",
      color: "#000",
    },
    ...options?.qrOptions,
  });

  const [qrCode, setQrCode] = useState<any | undefined>(undefined);

  const init = async () => {
    if (!qrCode) {
      // lazy load using the next dynamic
      // ref: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#loading-external-libraries
      const QRCodeStyling = (await import("qr-code-styling")).default;
      setQrCode(new QRCodeStyling(qrOptions));
    }

    if (ref.current) {
      qrCode?.append?.(ref.current);
    }
  };

  // check if ref exist and append the qr code to the ref
  useEffect(() => {
    init();
  }, [qrCode, ref, refetch]);

  // update the qr code when the qrOptions change
  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(qrOptions);
  }, [qrCode, qrOptions]);
};
