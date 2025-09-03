import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar";
import { CvProvider } from "./components/CvContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cv Genator - Create Your Professional CV with Ease",
  description: "Generate a professional CV effortlessly with our intuitive CV generator. Customize templates, add your details, and download your CV in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <CvProvider>
        <body className={inter.className}>
          {/* <NavBar></NavBar> */}
          {children}
        </body>
      </CvProvider>
    </html>
  );
}
