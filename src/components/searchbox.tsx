"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation"; // Corrected import path
import { useAccount } from "wagmi";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "react-hot-toast";


interface SearchComponentProps {
  className?: string;
}

const SearchBox: React.FC<SearchComponentProps> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isConnected } = useAccount();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = searchInputRef.current?.value.trim();
    if (!term) return;
    if (isConnected) {
      router.push(`/search?q=${encodeURIComponent(term)}`);
    } else {
      // Handle not connected case, maybe show a modal or toast
      toast.error("Please sign in to your wallet",{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };
  const arr=[1,2,3,4,5,7,9,10]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    
<div className="flex ">

    <div className={`flex flex-col justify-center items-center border border-gray-700 hover:shadow-lg focus-within:shadow-lg px-5 py-1 rounded-lg  shadow bg-opacity-5 ${className}`}>
    <div className={`flex w-full justify-center items-center ${open && "border-b"}  border-gray-700 `} onClick={()=>setOpen(!open)}>
    <form onSubmit={search} className="flex justify-center items-center md:w-auto w-full">

    
    <Image
              width={20}
              height={20}
              src="/search-normal.svg"
              alt="Search Icon"
              className="h-4 w-4 text-gray-500 mr-3"
            />
    <Input  
              ref={searchInputRef}
              value={query}
              onChange={handleInputChange}
              type="search"
              placeholder="What are you looking for..."
              className="md:w-[584px] mb-8 m-auto bg-transparent focus:outline-none focus:border-none border-none focus:ring-none  hover:bg-transparent outline-none"
            />
            </form>
      </div>
      {
  open && (
    <div className="flex flex-col  items-start justify-start w-full text-start space-y-2 max-h-[230px] overflow-y-scroll scroll-m-2  ">
      {arr.map((item, index) => (
        <li key={index} className="flex  items-center p-1 mt-1 px-1 space-x-3 w-full hover:bg-gray-800 rounded-md text-start " onClick={()=>setQuery("shad")}>
          <Image
            width={20}
            height={20}
            src="/search-normal.svg"
            alt="Search Icon"
            className="w-4 h-4 mr-3 text-gray-500"
          />
          Shad
        </li>
      ))}
    </div>
  )
}
    
    </div>
    </div>
  );
};

export default SearchBox;
