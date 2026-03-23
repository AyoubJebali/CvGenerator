import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar";
import { CvProvider } from "./components/CvContext";
import Providers from "./components/Providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Cv Genator - Create Your Professional CV with Ease",
  description:
    "Generate a professional CV effortlessly with our intuitive CV generator. Customize templates, add your details, and download your CV in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="curatorlight">
      <Providers>
        <CvProvider>
          <body className={`${inter.variable} ${manrope.variable} font-body bg-surface text-on-surface`}>
            <NavBar></NavBar>
            {children}
            <Analytics />
            <SpeedInsights />
          </body>
        </CvProvider>
      </Providers>
    </html>
  );
}
