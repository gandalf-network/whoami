import { Open_Sans, Poppins, Paytone_One } from "next/font/google";

export const openSans = Open_Sans({ subsets: ["latin"] });

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const paytoneOne = Paytone_One({ subsets: ["latin"], weight: ["400"] });
