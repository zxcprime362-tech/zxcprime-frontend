import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZXC[STREAM]",
  description: "Browse and discover movies",
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ZXC",
  },
};

export default function RootLayout({
  children,
  modal,
  player,
  search,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  player: React.ReactNode;
  search: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased custom-scrollbar`}
      >
        {/* Google Analytics Scripts */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FW6C6N98F8"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FW6C6N98F8');
            `,
          }}
        />

        <Provider>
          {children} {modal}
          {search}
          {player}
        </Provider>
      </body>
    </html>
  );
}
