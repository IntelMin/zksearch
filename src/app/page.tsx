import SearchBox from "@/components/searchbox";
import Image from "next/image";
import React, { Suspense } from "react";
import logoImg from "../../public/logo.svg";
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-between pt-56"
    >
      <div className="m-auto md:w-full">
        <Image
          className="w-88 mb-8 m-auto"
          width="75"
          height="25"
          objectFit="cover"
          src={logoImg}
          alt="logo"
        />
        <SearchBox className="m-auto" />
        
      </div>
    </main>
  );
}
