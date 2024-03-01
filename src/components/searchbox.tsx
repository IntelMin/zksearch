"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation"; // Corrected import path
import { useAccount } from "wagmi";
import { toast } from 'react-hot-toast';  

interface SearchComponentProps {
  className?: string;
}

const SearchBox: React.FC<SearchComponentProps> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isConnected } = useAccount();

  const query = searchParams.get("q") || "";

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = searchInputRef.current?.value || "";
    if (!term.trim()) return;
    // if (isConnected){
      router.push(`/search?q=${encodeURIComponent(term.trim())}`);
    // }
    // else {
    //   toast.error("Please sign in to your wallet");
    // }
    
  };

  return (
    <form
      className={`flex space-x-4 items-center ${className} rounded-3xl`}
      onSubmit={search}
    >
      <div
        className={`flex border border-gray-700 hover:shadow-lg focus-within:shadow-lg px-5 py-2.5 rounded-lg items-center shadow bg-opacity-5 ${className}`}
      >
        <Image
          width={20}
          height={20}
          src="/search-normal.svg"
          alt="Search Icon"
          className="h-5 w-5 text-gray-500 mr-3"
        />
        <input
          type="text"
          ref={searchInputRef}
          defaultValue={query} // Use the state instead of directly accessing router.query.query
          className="flex-grow focus:outline-none bg-transparent text-white 2xl:w-[550px] xl:w-[450px] md:w-[350px] sm:w-[250px]"
          placeholder="What are you looking for?"
        />
      </div>
    </form>
  );
};

export default SearchBox;