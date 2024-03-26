import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "~/_components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative h-dvh`}>
        <div className="absolute top-0 bottom-0 right-0 left-0 flex flex-col">
          <Header />

          <main className="flex h-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
