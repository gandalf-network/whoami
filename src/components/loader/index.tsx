/* eslint-disable @next/next/no-img-element */
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button as BaseButton } from "@/components/ui/button";
import { cn, shuffleArray } from "@/helpers/utils";
import { useInterval } from "@/hooks/use-interval";

import { DoYouKnowThatIcon, HalfEclipse, QuadrilateralStar } from "../icon";
import {
  BluePinkWaveBackground,
  CountdownCircleTimer,
  PageHeader,
} from "../themed";

export interface LoadingScreenProps
  extends React.HTMLAttributes<HTMLDivElement> {
  texts?: { title?: string; description: string }[];
}

/**
 * @body The title prop is not being used in the LoadingScreen component. Remove it if it's not needed.
 * @todo It was added with the intention of being used in the future for a possible improvement of dynamic loading titles.
 */
export const loadingTexts = [
  {
    title: "",
    description:
      "Netflix's original name was Kibble, inspired by the CEO's dog.",
  },
  {
    title: "",
    description: "Starting pay at Netflix is around $18 per hour.",
  },
  {
    title: "",
    description:
      "In 2014, a bug merged Netflix summaries, creating funny mashups.",
  },
  {
    title: "",
    description:
      "Netflix dominated 36.5% of North America's internet traffic in 2015.",
  },
  {
    title: "",
    description: `"Example Show," Netflix’s first film, was just an 11-minute test.`,
  },
  {
    title: "",
    description: "The world gives 12.6% of its internet bandwidth to Netflix.",
  },
  {
    title: "",
    description: "55% of Netflix users pay for their own subscriptions.",
  },
  {
    title: "",
    description: "Founded on August 29, 1997, Netflix began as a DVD service.",
  },
  {
    title: "",
    description: `Reed Hastings started Netflix after a $40 late fee on "Apollo 13."`,
  },
  {
    title: "",
    description:
      "Netflix stalks pirate site download stats to decide on which shows to buy.",
  },
  {
    title: "",
    description:
      "Netflix proposed a partnership to Blockbuster, but got laughed off.",
  },
  {
    title: "",
    description:
      "Netflix used rectangular envelopes to avoid UPS's square surcharge.",
  },
  {
    title: "",
    description: `Netflix was the first online service to win a popular award with "House of Cards" in 2013.`,
  },
  {
    title: "",
    description:
      "In 2006, Netflix held a million-dollar contest aimed to perfect its algorithm.",
  },
  {
    title: "",
    description: `Netflix once had over 70,000 "secret codes" to explore content.`,
  },
  {
    title: "",
    description: "The original streaming box by Netflix evolved into Roku.",
  },
  {
    title: "",
    description: `"The Queen's Gambit" spiked chess board sales by 125%.`,
  },
  {
    title: "",
    description: "Netflix live experiences have seen 42 marriage proposals.",
  },
  {
    title: "",
    description: `"Stranger Things: 1984" was the first Netflix game downloaded.`,
  },
  {
    title: "",
    description: `"Binge-watch" was 2015's word of the year, added to the dictionary in 2017.`,
  },
  {
    title: "",
    description: `"Netflix and chill" first appeared in a 2009 tweet.`,
  },
  {
    title: "",
    description: `Netflix almost had a goat bleat for its sound logo before choosing "tudum."`,
  },
  {
    title: "",
    description:
      "Netflix socks could detect when you fell asleep and pause your show.",
  },
  {
    title: "",
    description: "The Flixies was Netflix’s own awards show.",
  },
  {
    title: "",
    description:
      "Ben & Jerry’s created a Netflix & Chill'd ice cream flavor in 2021.",
  },
  {
    title: "",
    description: `"Squid Game" is Netflix's all-time most popular title.`,
  },
];

export const LoadingTrivia = () => {
  const texts = shuffleArray(loadingTexts.map((text) => text.description));

  const [index, setIndex] = useState(0);

  const onNext = () => {
    if (index === texts.length - 1) {
      return setIndex(0);
    }

    setIndex((prev) => (prev + 1) % texts.length);
  };

  const onPrev = () => {
    if (index === 0) {
      return setIndex(texts.length - 1);
    }

    setIndex((prev) => (prev - 1 + texts.length) % texts.length);
  };

  useInterval(
    () => {
      setIndex((prev) => (prev + 1) % texts.length);
    },
    { delay: 5000 },
  );

  return (
    <div className="max-w-[95%] mx-auto flex-col flex-center gap-6 md:gap-4 rounded-lg border-2 bg-primary-cyan-shade p-6 md:p-4">
      <div className="w-8 h-8">
        <CountdownCircleTimer
          isPlaying
          duration={5}
          rotation="clockwise"
          colors={["#000"] as any}
          strokeWidth={4}
          trailColor="#fff"
          key={index}
          onComplete={() => {
            return { shouldRepeat: true };
          }}
          size={32}
        />
      </div>

      <div>
        <DoYouKnowThatIcon />
        <p className="text-center text-lg md:text-base font-medium mt-1.5">
          {texts[index]}
        </p>
      </div>

      <div className="flex justify-center gap-12 items-center mt-2">
        <BaseButton
          onClick={onPrev}
          className="w-7 h-7 border shadow-[1px_2px] rounded-full flex-center p-0 bg-background z-20"
        >
          <ArrowLeft className="w-4 md:w-5" />
        </BaseButton>

        <BaseButton
          onClick={onNext}
          className="w-7 h-7 border shadow-[1px_2px] rounded-full flex-center p-0  bg-background z-20"
        >
          <ArrowRight className="w-4 md:w-5" />
        </BaseButton>
      </div>
    </div>
  );
};

export const LoadingScreen = ({
  className,
  texts = loadingTexts,
  ...props
}: LoadingScreenProps) => {
  return (
    <div
      className={cn(
        "px-4 py-6 bg-background flex-col flex-center h-full overflow-hidden offset-content",
        className,
      )}
      {...props}
    >
      <PageHeader />

      <div className="flex-1 flex-center flex-col gap-2.5 mb-14 px-2 relative z-50">
        <div className="flex-center flex-col gap-2 pb-14 px-2 w-full mb-4">
          <img
            src="/loading.gif"
            className="w-16 h-16 object-cover"
            alt="loading animation"
          />

          <p className="text-center text-base opacity-50 mb-3">
            Crunching your data <br />
            This might take a minute...
          </p>

          <LoadingTrivia />
        </div>
      </div>

      <QuadrilateralStar
        className="absolute w-12 bottom-[30%] -left-5 opacity-50 pointer-events-none"
        strokeWidth={1}
      />

      <HalfEclipse
        className="absolute w-16 top-[6%] -right-6 opacity-50 pointer-events-none rotate-180"
        strokeWidth={1}
      />

      <BluePinkWaveBackground className="justify-end z-10 pointer-events-none" />
    </div>
  );
};

interface LoaderProps {
  children?: React.ReactNode;
  loading?: boolean;
}

export const Loader = ({ children, loading }: LoaderProps) => {
  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
