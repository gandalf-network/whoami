import {
  GithubIcon,
  LogoIcon,
  LogoMarkOutlinedIcon,
  PoweredByGandalfIcon,
  VercelIcon,
} from "@/components/icon";
import {
  BluePinkWaveBackground,
  Box,
  BulletPoint,
  Button,
  GridLineBackground,
} from "@/components/themed";
import { StartButton } from "@/components/themed/start-button";
import { appInfo } from "@/helpers/utils";

export const LandingScreen = () => {
  return (
    <>
      <div className="py-10 flex-col flex-center h-full offset-content">
        <Box className="flex-center-y gap-x-8 h-10">
          <BulletPoint />
          <PoweredByGandalfIcon className="w-36" />
          <BulletPoint />
        </Box>

        <div className="flex-1 flex-center flex-col gap-3">
          <div className="flex-center-y gap-x-1">
            <LogoIcon className="w-14" />
            <LogoMarkOutlinedIcon className="w-64" />
          </div>
          <p className="text-lg text-center max-w-72 font-medium">
            Connect your Netflix profile and we will tell you who you are
          </p>
          <StartButton className="mt-8 uppercase font-semibold">
            Start
          </StartButton>

          <p className="text-center font-regular my-8 text-sm opacity-60">
            Available for only iPhones & iPads <br /> Android coming soon
          </p>
        </div>

        <div className="flex-center-y gap-x-2 mb-8">
          <a target="_blank" href={appInfo.repoUrl}>
            <Button className="text-xs gap-x-1 h-8 border shadow-[0px_4px] bg-background hover:bg-background rounded-full px-4">
              <GithubIcon className="w-5" />
              See source code
            </Button>
          </a>
          <a target="_blank" href={appInfo.deployUrl}>
            <Button className="text-xs gap-x-1 h-8 border shadow-[0px_4px] bg-background hover:bg-background rounded-full px-4">
              <VercelIcon className="w-5" />
              Deploy to Vercel
            </Button>
          </a>
        </div>
      </div>

      <BluePinkWaveBackground className="justify-end z-10" />

      <GridLineBackground />
    </>
  );
};
