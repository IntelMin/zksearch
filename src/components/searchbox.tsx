"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; // Corrected import path
import { useAccount } from "wagmi";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-hot-toast";
import axios from "axios";
interface SearchComponentProps {
  className?: string;
  layout?: boolean;
}

const SearchBox: React.FC<SearchComponentProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const setItem = (item: string) => {
    setQuery(item);
    setOpen(!open);
  };

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = searchInputRef.current?.value || "";
    if (!term.trim()) return;
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  };

  const arr = [1, 2, 3, 4, 5];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() !== "") {
      fetchSuggestions(newQuery);
    } else {
      setSuggestions([]);
    }
  };
  const fetchSuggestions = async (input: string) => {
    try {
      const response = await axios.get<{
        items: { title: string }[];
      }>(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_CX}&q=${input}`
      );
      const suggestedItems = response.data.items.map((item: any) => item.title);
      setSuggestions(suggestedItems);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };
  return (
    <div className='flex text-white '>
      <div
        className={`flex flex-col  justify-center items-center border border-gray-700 hover:shadow-lg focus-within:shadow-lg px-5 py-1 rounded-lg shadow bg-opacity-5 ${className}`}
      >
        {pathname === "/search" ? (
          <>
            <div
              className={`flex w-full justify-center items-center ${
                open && "border-b"
              } ${open && "mt-[240px]"} border-gray-700`}
              onClick={() => setOpen(!open)}
            >
              <form
                onSubmit={search}
                className='flex justify-center items-center md:w-auto w-full'
              >
                <Image
                  width={20}
                  height={20}
                  src='/search-normal.svg'
                  alt='Search Icon'
                  className='h-4 w-4 text-gray-500 mr-3'
                />
                <Input
                  ref={searchInputRef}
                  value={query}
                  onChange={handleInputChange}
                  type='search'
                  placeholder='What are you looking for...'
                  className='md:w-[584px] mb-8 m-auto bg-transparent focus:outline-none focus:border-none border-none focus:ring-none hover:bg-transparent outline-none'
                />
              </form>
            </div>
            {open && (
              <div className='flex flex-col items-start justify-start w-full text-start space-y-2 max-h-[230px] overflow-y-auto scroll-m-2'>
                {/* {arr.map((item, index) => (
                  <li
                    key={index}
                    className='flex items-center p-1 mt-1 px-1 space-x-3 w-full hover:bg-gray-800 rounded-md text-start'
                    onClick={() => setItem("Shad")}
                  >
                    <Image
                      width={20}
                      height={20}
                      src='/search-normal.svg'
                      alt='Search Icon'
                      className='w-4 h-4 mr-3 text-white'
                    />
                    hello
                  </li>
                ))} */}
                {suggestions.length > 0 && (
                  <ul className='absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-b-lg shadow-md'>
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div
              className={`flex w-full justify-center items-center ${
                open && "border-b"
              } border-gray-700`}
              onClick={() => setOpen(!open)}
            >
              <form
                onSubmit={search}
                className='flex justify-center items-center md:w-auto w-full'
              >
                <Image
                  width={20}
                  height={20}
                  src='/search-normal.svg'
                  alt='Search Icon'
                  className='h-4 w-4 text-gray-500 mr-3'
                />
                <Input
                  ref={searchInputRef}
                  value={query}
                  onChange={handleInputChange}
                  type='search'
                  placeholder='What are you looking for...'
                  className='md:w-[584px] mb-8 m-auto bg-transparent focus:outline-none focus:border-none border-none focus:ring-none hover:bg-transparent outline-none'
                />
              </form>
            </div>
            {open && (
              <div className='flex flex-col items-start justify-start w-full text-start space-y-2 max-h-[230px] overflow-y-auto scroll-m-2'>
                {/* {arr.map((item, index) => (
                  <li
                    key={index}
                    className='flex items-center p-1 mt-1 px-1 space-x-3 w-full hover:bg-gray-800 rounded-md text-start'
                    onClick={() => setItem("Shad")}
                  >
                    <Image
                      width={20}
                      height={20}
                      src='/search-normal.svg'
                      alt='Search Icon'
                      className='w-4 h-4 mr-3 text-white'
                    />
                 
                    hello
                  </li>
                ))} */}
                {suggestions.length > 0 && (
                  <ul className='absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-b-lg shadow-md'>
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
