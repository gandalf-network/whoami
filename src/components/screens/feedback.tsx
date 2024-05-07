"use client";

import Link from "next/link";

import { WarningIcon } from "@/components/icon";
import {
  BluePinkWaveBackground,
  PageHeader,
  Button,
} from "@/components/themed";
import { ButtonProps } from "@/types";

export const FeedbackScreen = ({
  title = "Oops! Something went wrong",
  cta,
  href,
}: {
  title?: string;
  cta?: ButtonProps;
  href?: string;
}) => {
  return (
    <>
      <div className="py-4 flex-col flex-center h-full offset-content">
        <PageHeader className="px-4" />

        <div className="flex-1 flex-center flex-col gap-4 mb-12">
          <WarningIcon className="w-20" />
          <p className="text-base md:text-lg text-center max-w-72 font-medium mb-8">
            {title}
          </p>
          {cta && (
            <>
              {href ? (
                <Link href={href}>
                  <Button {...cta} />
                </Link>
              ) : (
                <Button {...cta} />
              )}
            </>
          )}
        </div>
      </div>

      <BluePinkWaveBackground className="justify-end z-10" />
    </>
  );
};
