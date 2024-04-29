"use client";

import { Loader2 } from "lucide-react";

import { GandalfIcon, LogoIcon, NetflixIcon } from "@/components/icon";
import {
  BluePinkWave1Background,
  Container,
  QRCode,
} from "@/components/themed";
import { useGandalfConnect } from "@/hooks/use-connect";

export default function Page() {
  const { url: connectUrl, loading } = useGandalfConnect();

  return (
    <Container className="relative bg-primary-pink-shade">
      <div className="py-10 flex-col flex items-center h-full offset-content story-content">
        <div className="flex-center-x">
          <div className="w-10 h-10 rounded-full bg-background flex-center">
            <LogoIcon />
          </div>
          <GandalfIcon className="w-10 -translate-x-2" />
        </div>

        <div className="mt-10 mb-8 text-center px-8">
          <p className="text-2xl max-w-sm mx-auto mb-4 font-medium">
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

        <div className="w-72 h-72 bg-background flex-center">
          {loading ? (
            <Loader2 className="w-8 h-8 animate-spin" />
          ) : (
            <QRCode value={connectUrl} />
          )}
        </div>
      </div>

      <BluePinkWave1Background className="justify-end z-10" />
    </Container>
  );
}
