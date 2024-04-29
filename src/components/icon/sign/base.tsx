import { Aquarius } from "./aquarius";
import { Aries } from "./aries";
import { Cancer } from "./cancer";
import { Capricorn } from "./capricorn";
import { Constellation } from "./constellation";
import { Gemini } from "./gemini";
import { Leo } from "./leo";
import { Libra } from "./libra";
import { Pisces } from "./pisces";
import { Sagittarius } from "./sagittarius";
import { Scorpio } from "./scorpio";
import { Taurus } from "./taurus";
import { Virgo } from "./virgo";

export const StarSignIcon = ({
  sign,
  ...props
}: React.SVGProps<SVGSVGElement> & { sign: string }) => {
  switch (sign.toLocaleLowerCase()) {
    case "aquarius":
      return <Aquarius {...props} />;

    case "aries":
      return <Aries {...props} />;

    case "cancer":
      return <Cancer {...props} />;

    case "capricorn":
      return <Capricorn {...props} />;

    case "gemini":
      return <Gemini {...props} />;

    case "leo":
      return <Leo {...props} />;

    case "libra":
      return <Libra {...props} />;

    case "pisces":
      return <Pisces {...props} />;

    case "sagittarius":
      return <Sagittarius {...props} />;

    case "scorpio":
      return <Scorpio {...props} />;

    case "taurus":
      return <Taurus {...props} />;

    case "virgo":
      return <Virgo {...props} />;

    default:
      return <Constellation {...props} />;
  }
};
