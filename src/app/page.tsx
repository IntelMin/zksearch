import SearchBox from "@/components/searchbox";
import Image from "next/image";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-between p-24"
      style={{ height: "calc(100vh - 88px)" }}
    >
      <div className="m-auto w-full">
        <Image
          className="w-88 mb-8 m-auto"
          width="75"
          height="25"
          objectFit="cover"
          src="/z.png"
          alt="logo"
        />
        <SearchBox className="m-auto" />
      </div>
    </main>
  );
}
