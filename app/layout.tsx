import type { Metadata, Viewport } from "next";
import "./globals.css";
import { IslandProvider } from "@/lib/IslandContext";

export const metadata: Metadata = {
  title: "Habitat Nova — Where your habits build a world",
  description:
    "Habitat Nova turns your daily habits into a living pastel-sci-fi island. Show up, and it glows. Skip a day, and it gets a little quiet — never gone.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E8E1F5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <IslandProvider>{children}</IslandProvider>
      </body>
    </html>
  );
}
