import type { Metadata } from "next";
import React, { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import OGIMG from "../../public/og.png";

const inter = Inter({ subsets: ["latin"] });
const title = "zKSearch";
const description =
  "zkSearch is a privacy-centric search engine crafted within the ZKML ecosystem, utilising established privacy-focused technologies while refraining from storing user data. It harnesses the power of Bittensor to deliver AI-driven search capabilities within the secure confines of the ZKML subnet, ensuring heightened levels of privacy and security.";
const domain = process.env.DOMAIN || "";
const ogimage = OGIMG.src;

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    type: "website",
    url: domain,
    title: title,
    description: description,
    siteName: domain,
    images: [
      {
        url: ogimage,
        alt: "zkSearch",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div
            style={{
              backgroundImage: "url(/bg.png)",
              backgroundSize: "cover",
              minHeight: "100vh",
            }}
          >
            <Suspense>
              <Header />
              {children}
              <Footer />
            </Suspense>
          </div>
          <Toaster
            position="top-center"
            containerStyle={{ backgroundColor: "#black" }}
          />
        </Providers>
      </body>
    </html>
  );
}
