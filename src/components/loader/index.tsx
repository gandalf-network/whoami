/* eslint-disable @next/next/no-img-element */
import { cn } from "@/helpers/utils";

import { HalfEclipse, QuadrilateralStar } from "../icon";
import { BluePinkWaveBackground, PageHeader, TextAnimation } from "../themed";

export interface LoadingScreenProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  content?: { title?: string; description: string }[];
}

export const loadingTexts = [
  {
    title: "",
    description:
      "Processing your data will take a few minutes. Enjoy some Netflix fun facts while you wait",
  },
  {
    title: "Did you know that?",
    description:
      "Netflix's original name was Kibble, inspired by the CEO's dog.",
  },
  {
    title: "Did you know that?",
    description: "Starting pay at Netflix is around $18 per hour.",
  },
  {
    title: "Did you know that?",
    description:
      "In 2014, a bug merged Netflix summaries, creating funny mashups.",
  },
  {
    title: "Did you know that?",
    description:
      "Netflix dominated 36.5% of North America's internet traffic in 2015.",
  },
  {
    title: "Did you know that?",
    description: `"Example Show," Netflix’s first film, was just an 11-minute test.`,
  },
  {
    title: "Did you know that?",
    description: "The world gives 12.6% of its internet bandwidth to Netflix.",
  },
  {
    title: "Did you know that?",
    description: "55% of Netflix users pay for their own subscriptions.",
  },
  {
    title: "Did you know that?",
    description: "Founded on August 29, 1997, Netflix began as a DVD service.",
  },
  {
    title: "Did you know that?",
    description: `Reed Hastings started Netflix after a $40 late fee on "Apollo 13."`,
  },
  {
    title: "Did you know that?",
    description:
      "Netflix stalks pirate site download stats to decide on which shows to buy.",
  },
  {
    title: "Did you know that?",
    description:
      "Netflix proposed a partnership to Blockbuster, but got laughed off.",
  },
  {
    title: "Did you know that?",
    description:
      "Netflix used rectangular envelopes to avoid UPS's square surcharge.",
  },
  {
    title: "Did you know that?",
    description: `Netflix was the first online service to win a popular award with "House of Cards" in 2013.`,
  },
  {
    title: "Did you know that?",
    description:
      "In 2006, Netflix held a million-dollar contest aimed to perfect its algorithm.",
  },
  {
    title: "Did you know that?",
    description: `Netflix once had over 70,000 "secret codes" to explore content.`,
  },
  {
    title: "Did you know that?",
    description: "The original streaming box by Netflix evolved into Roku.",
  },
  {
    title: "Did you know that?",
    description: `"The Queen's Gambit" spiked chess board sales by 125%.`,
  },
  {
    title: "Did you know that?",
    description: "Netflix live experiences have seen 42 marriage proposals.",
  },
  {
    title: "Did you know that?",
    description: `"Stranger Things: 1984" was the first Netflix game downloaded.`,
  },
  {
    title: "Did you know that?",
    description: `"Binge-watch" was 2015's word of the year, added to the dictionary in 2017.`,
  },
  {
    title: "Did you know that?",
    description: `"Netflix and chill" first appeared in a 2009 tweet.`,
  },
  {
    title: "Did you know that?",
    description: `Netflix almost had a goat bleat for its sound logo before choosing "tudum."`,
  },
  {
    title: "Did you know that?",
    description:
      "Netflix socks could detect when you fell asleep and pause your show.",
  },
  {
    title: "Did you know that?",
    description: "The Flixies was Netflix’s own awards show.",
  },
  {
    title: "Did you know that?",
    description:
      "Ben & Jerry’s created a Netflix & Chill'd ice cream flavor in 2021.",
  },
  {
    title: "Did you know that?",
    description: `"Squid Game" is Netflix's all-time most popular title.`,
  },
];

export const LoadingScreen = ({
  className,
  content = loadingTexts,
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

      <div className="flex-1 flex-center flex-col gap-3 mb-10 px-5">
        <img
          src="/loading.gif"
          className="w-16 h-16 object-cover"
          alt="loading animation"
        />

        <TextAnimation
          texts={content.map((item) => item?.title || "")}
          className="text-sm font-normal uppercase text-center mx-auto opacity-50"
          duration={5000}
        />
        <TextAnimation
          texts={content.map((item) => item?.description || "")}
          className="text-lg font-medium text-center mx-auto"
          duration={5000}
        />
      </div>

      <QuadrilateralStar
        className="absolute w-24 bottom-[30%] -left-8 opacity-50 pointer-events-none"
        strokeWidth={1}
      />

      <HalfEclipse
        className="absolute w-28 top-[10%] -right-12 opacity-50 pointer-events-none rotate-180"
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
