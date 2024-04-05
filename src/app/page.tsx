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
  Container,
  GridLineBackground,
} from "@/components/themed";
import { appInfo } from "@/helpers/utils";

export default function Home() {
  return (
    <Container className="relative">
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
          <p className="text-lg text-center max-w-72">
            Connect your Netflix profile and we will tell you who you are
          </p>
          <a href={appInfo.connectUrl} target="_blank">
            <Button className="mt-8">Start</Button>
          </a>
        </div>

        <Box className="flex-center-y gap-x-2 h-9 border shadow-[0px_4px] mb-8">
          <a target="_blank" href={appInfo.repoUrl}>
            <Button variant="link" className="text-xs gap-x-1 px-0">
              <GithubIcon className="w-5" />
              See source code
            </Button>
          </a>
          <BulletPoint className="w-1 h-1" />
          <a target="_blank" href={appInfo.deployUrl}>
            <Button variant="link" className="text-xs gap-x-1 px-0">
              <VercelIcon className="w-5" />
              Deploy to Vercel
            </Button>
          </a>
        </Box>
      </div>

      <BluePinkWaveBackground className="justify-end z-10" />

      <GridLineBackground />
    </Container>
  );
}
