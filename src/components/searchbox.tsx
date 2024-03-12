"use client";

import React, { useEffect, useRef, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const SearchBox: React.FC<SearchComponentProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLInputElement>(null);
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
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  };

  const arr = [1, 2, 3, 4, 5];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() !== "") {
      setOpen(true)
      fetchSuggestions(newQuery);
      console.log("suggestions", suggestions)
    } else {
      setOpen(false);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])
  const fetchSuggestions = async (input: string) => {
    try {
      const response = await axios.post("/api/suggest", {
        query: input
      });

      console.log("suggestions", response.data.data)

      setSuggestions(response.data.data)
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
        className={`flex flex-col justify-center items-center border border-gray-700 hover:shadow-lg focus-within:shadow-lg px-5 py-1 rounded-lg shadow bg-opacity-5 ${className}`}
      >
        {pathname === "/search" ? (
          <>
            <div
              className={`relative flex w-full justify-center items-center border-gray-700`}
              ref={dropdownRef}
            // onClick={() => setOpen(!open)}
            >
              <form
                onSubmit={search}
              >
                <div className='flex justify-center items-center md:w-auto w-full'>
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
                    type="search"
                    placeholder="What are you looking for..."
                    className="flex-grow focus:outline-none bg-transparent text-white 2xl:w-[550px] xl:w-[450px] md:w-[350px] sm:w-[250px]"
                  />
                </div>

                {open &&
                  <div className="absolute top-full left-0 right-0 bg-search-suggestion border-gray-300 border mt-1 rounded-lg shadow-md">
                    {
                      suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className='px-4 py-2 cursor-pointer'
                        >
                          {suggestion}
                        </div>
                      ))
                    }
                  </div>
                }
              </form>
            </div>
          </>
        ) : (
          <>
            <div
              className={`relative flex w-full justify-center items-center border-b border-gray-700`}
              ref={dropdownRef}
            >
              <form
                onSubmit={search}
                className='flex justify-center items-center md:w-auto w-full'
              >
                <div className='flex justify-center items-center md:w-auto w-full'>
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
                </div>

                {open &&
                  <div className="absolute top-full left-0 right-0 bg-search-suggestion border-gray-300 border mt-1 rounded-lg shadow-md">
                    {
                      suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className='px-4 py-2 cursor-pointer'
                        >
                          {suggestion}
                        </div>
                      ))
                    }
                  </div>
                }
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
