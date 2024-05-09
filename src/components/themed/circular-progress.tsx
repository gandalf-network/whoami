import { CountdownCircleTimer as BaseCountdownCircleTimer } from "react-countdown-circle-timer";

export const CountdownCircleTimer = (
  props: React.ComponentPropsWithoutRef<typeof BaseCountdownCircleTimer>,
) => <BaseCountdownCircleTimer {...props} />;
