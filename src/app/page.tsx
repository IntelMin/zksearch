"use client";
import SearchBox from "@/components/searchbox";
import Image from "next/image";
import React from "react";
import logoImg from "../../public/logo.svg";

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center'>
        <div className='mb-8'>
          <Image
            className='object-cover'
            width={100}
            height={100}
            src={logoImg}
            alt='logo'
          />
        </div>
        <SearchBox className='w-full max-w-lg' />
      </div>
    </main>
  );
}
