import { FeedbackScreen } from "@/components/screens/feedback";
import { Container } from "@/components/themed";

export default function NotFound() {
  return (
    <Container className="relative">
      <FeedbackScreen
        title="404: Page not found"
        href="/"
        cta={{
          children: "Go Home",
        }}
      />
    </Container>
  );
}
