import { UserReportCardType, UserStatsType } from "@/types";

export const TVStatsMockedData: UserStatsType = {
  firstTvShow: {
    show: {
      id: "1",
      dateFirstPlayed: "10/11/2022",
      title: "Stranger Things",
      imageURL:
        "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712250918/gandalf/whoami/st_ijxdwk.png",
    },
    quip: "Who knew that spooky intro would kick off your binge-watching addiction?",
  },
  mostWatchedTvShow: {
    show: {
      id: "1",
      dateFirstPlayed: "",
      title: "Friends",
      imageURL:
        "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712250921/gandalf/whoami/fr_fn7ebw.png",
    },
    quip: "Looks like those coffee-fueled shenanigans keep calling you back for more!",
  },
  yourCrossoverStar: {
    name: "Jennifer Aniston",
    topShows: ["Friends", "The Morning Show", "The Break-Up"],
    imageURL:
      "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712250919/gandalf/whoami/ja_pefc4y.png",
  },
  genreDistribution: {
    genres: [
      {
        genre: "😂 Comedy",
        percentage: 35,
      },
      {
        genre: "👀 Drama",
        percentage: 25,
      },
      {
        genre: "🕵️‍♂️ Mystery",
        percentage: 20,
      },
      {
        genre: " 😱 Thriller",
        percentage: 12,
      },
      {
        genre: "🚀 Sci-fi ",
        percentage: 8,
      },
    ],
    quip: "Looks like you're a well-rounded viewer with a penchant for a good laugh and an adrenaline rush!",
  },
  watchHistory: {
    totalShowsWatched: 78,
    topShows: [
      {
        id: "1",
        dateFirstPlayed: "",
        title: "The Last Kingdom",
        imageURL:
          "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712250917/gandalf/whoami/tlk_djxkxl.png",
      },
      {
        id: "1",
        dateFirstPlayed: "",
        title: "Friends",
        imageURL:
          "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712250921/gandalf/whoami/fr_fn7ebw.png",
      },
      {
        id: "1",
        dateFirstPlayed: "",
        title: "The Crown",
        imageURL:
          "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712250926/gandalf/whoami/tc_bhh31q.png",
      },
    ],
  },
};

export const ReportsCardMockedData: UserReportCardType = {
  tvBFF: {
    name: "Chandler Bing",
    show: "Friends",
    reason:
      "His sarcastic wit and lovable charm make him perfect for you. Looks like both of you are destined for comedic adventures!",
    imageURL:
      "https://res.cloudinary.com/dmsic9qmj/image/upload/v1712348909/gandalf/whoami/chandler_ya1dya.png",
  },
  starSign: {
    name: "aries",
    reason:
      "With a penchant for epic battles and intricate plots, Uhtred of Bebbanburg would proudly claim you as his own.",
  },
  personality: {
    personality: "The Adventurer",
    reason:
      "You always seek thrills and excitement, with a taste for the unexpected in every TV journey.",
    rtScore: 10,
  },
};
