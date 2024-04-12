import Connect from "@gandalf-network/connect";

import { GandalfIcon, LogoIcon, NetflixIcon } from "@/components/icon";
import {
  BluePinkWave1Background,
  Container,
  QRCode,
} from "@/components/themed";

const getConnectUrl = async () => {
  const connect = new Connect({
    publicKey: process.env.NEXT_PUBLIC_GANDALF_PUBLIC_KEY as string,
    redirectURL: process.env.NEXT_PUBLIC_GANDALF_REDIRECT_URL as string,
    services: { netflix: true },
  });

  const connectUrl = await connect.generateURL();

  return connectUrl;
};

export default async function Page() {
  const connectUrl = await getConnectUrl();

  return (
    <Container className="relative bg-primary-pink-shade">
      <div className="py-10 flex-col flex items-center h-full offset-content">
        <div className="flex-center-x">
          <div className="w-10 h-10 rounded-full bg-background flex-center">
            <LogoIcon />
          </div>
          <GandalfIcon className="w-10 -translate-x-2" />
        </div>

        <div className="mt-10 mb-8 text-center px-8">
          <p className="text-2xl max-w-sm mx-auto mb-4">
            whoami.tv uses Gandalf <br /> to link your
            <span className="inline-flex translate-y-0.5">
              <NetflixIcon className="w-5 " />
            </span>
            Netflix account
          </p>

          <p className="text-muted">
            Scan this QR code with your mobile phone to link your account
          </p>
        </div>

        <div className="w-80 h-80 bg-background flex-center">
          <QRCode value={connectUrl} />
        </div>
      </div>

      <BluePinkWave1Background className="justify-end z-10" />
    </Container>
  );
}
