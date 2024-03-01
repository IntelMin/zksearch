import type { Metadata } from "next";
import React, { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "zkSearch",
  description: "zkSearch",
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
