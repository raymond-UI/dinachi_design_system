import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const catamaran = Funnel_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-catamaran",
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Dinachi Design Systeam",
  description: "Extended Shadcn component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${catamaran.variable}`}>
      <body
        className={` font-sans antialiased flex justify-center items-center p-2`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
