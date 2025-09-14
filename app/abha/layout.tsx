import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABHA Registration - Health ID",
  description: "Register for your Ayushman Bharat Health Account (ABHA)",
};

export default function AbhaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
