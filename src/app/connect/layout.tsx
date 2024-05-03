import { Suspense } from "react";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
