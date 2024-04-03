import { LogoIcon, PoweredByGandalfIcon } from "@/components/icon";
import { Button, Container } from "@/components/themed";

export default function Home() {
  return (
    <Container className="py-10 flex flex-col items-center justify-center">
      <div className="flex-1 flex flex-col gap-3 justify-center items-center">
        <LogoIcon className="w-48" />
        <p className="text-center max-w-64">
          Show us your TV shows and we will tell you who you are
        </p>
        <Button className="mt-8">Start</Button>
      </div>

      <PoweredByGandalfIcon className="w-40" />
    </Container>
  );
}
