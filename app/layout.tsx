import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rizal Abdurrakhman | Web Developer",
  description:
    "Portfolio Rizal Abdurrakhman - Web Developer and Software Engineering Student.",




  icons: {
    icon: "/icon-dark-32x32.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}