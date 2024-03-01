"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation"; // Corrected import path
import { useAccount } from "wagmi";
import { toast } from "react-hot-toast";

interface SearchComponentProps {
  className?: string;
}

const SearchBox: React.FC<SearchComponentProps> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>("");
  const { isConnected } = useAccount();
  const [suggestion, setSuggestion] = useState([
    "First Suggestion",
    "Second Suggestion",
    "Third Suggestion",
    "Fourth Suggestion",
  ]);

  const query = searchParams.get("q") || "";

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.length < 1) return;
    if (!searchInput.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
  };

  return (
    <form
      className={`flex flex-col space-x-4 items-center ${className} rounded-3xl`}
      onSubmit={search}
    >
      <div
        className={`flex hover:shadow-lg focus-within:shadow-lg px-5 py-2.5 ${
          searchInput?.length > 0 ? "rounded-t-lg" : "rounded-lg"
        } items-center shadow bg-[#18181B66] bg-opacity-5 ${className}`}
      >
        <Image
          width={20}
          height={20}
          src="/search-normal.svg"
          alt="Search Icon"
          className="mr-3 h-5 w-5 text-gray-500"
        />
        <input
          type="text"
          autoFocus
          onChange={(e) => setSearchInput(e.target.value)}
          defaultValue={query} // Use the state instead of directly accessing router.query.query
          className={`flex-grow bg-transparent text-white focus:outline-none sm:w-[250px] md:w-[350px] xl:w-[450px] 2xl:w-[550px] ${
            searchInput?.length > 0 ? "border-b border-[#27272A] pb-2" : ""
          }`}
          placeholder="What are you looking for?"
        />
      </div>
      {searchInput?.length > 0 &&
        (Array.isArray(suggestion) && suggestion?.length > 0 ? (
          suggestion?.map((item, i) => {
            return (
              <div
                key={i}
                className="translate-x-[-8px] bg-[#18181B66] px-5 py-2.5"
              >
                <div className="flex gap-3">
                  <Image
                    width={20}
                    height={20}
                    src="/search-normal.svg"
                    alt="Search Icon"
                    className="mr-3 h-5 w-5 text-gray-500"
                  />
                  <h1 className="w-[538px] -translate-y-1">{item}</h1>
                </div>
              </div>
            );
          })
        ) : (
          <div>Nothing found</div>
        ))}
    </form>
  );
};

export default SearchBox;
