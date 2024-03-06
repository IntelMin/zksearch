"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SearchBox from "./searchbox";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Connect } from "./connect";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

import logoImg from "../../public/logo.svg";
import userImg from "../../public/user.svg";
import closeImg from "../../public/close.svg";

const variants = {
  hidden: { opacity: 0, x: 200, y: -20 },
  enter: { opacity: 1, x: 50, y: -20 },
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [viewsign, setViewsign] = useState(false);
  const { address, isConnected } = useAccount();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setViewsign(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, []);

  return (
    <div
      className={`px-5 fixed w-full bg-opacity-70 z-10 ${pathname === "/search" && "backdrop-blur"
        }`}
    >
      <div className="flex w-full md:px-4 py-2">
        {pathname === "/search" && (
          <div className="flex">
            <a href="https://zksearch.zkml.systems/" target="_blank" rel="noopener noreferrer">
              <Image
                width={30}
                height={30}
                src={logoImg}
                alt="LOGO"
                className="mr-8 mt-2"
              />
            </a>
            <div className="absolute md:left-[100px] left-[70px]  bg-[#27272A] rounded-md bg-opacity-80">
              <SearchBox />
          </div>
          </div>
        )}
        <div
          className="ml-auto flex h-11 w-11 cursor-pointer rounded-full border border-custom-gray bg-stone-900 bg-opacity-70 p-4 hover:bg-stone-500 hover:text-stone-700"
          onClick={() => setViewsign(!viewsign)}
        >
          <Image src={userImg} alt={`avatar`}></Image>
        </div>
        {viewsign && (
          <motion.main
            variants={variants}
            initial="hidden"
            animate="enter"
            transition={{ type: "linear" }}
          >
            <div
              ref={ref}
              className="fade fixed right-20 top-20 ml-auto flex h-[160px] w-[300px] rounded-2xl border border-stone-500 bg-stone-900 bg-opacity-30"
            >
              <div className="flex w-1/4 border-r border-stone-500">
                <Image
                  width={48}
                  height={48}
                  src={logoImg}
                  alt="LOGO"
                  className="mx-auto"
                />
              </div>
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-row">
                  <div className="w-5/8 px-4 pt-2">
                    <p className="text-sm text-white">Sign In With Wallet</p>
                    <p className="text-sm text-white">To ZKML AI Search</p>
                    <p className="my-3 text-sm text-stone-500">
                      Connect your wallet for better results!
                    </p>
                  </div>
                  <div className="w-1/8 p-2">
                    <Image
                      width={36}
                      height={36}
                      src={closeImg}
                      alt="close"
                      className="ml-auto cursor-pointer rounded-full"
                      onClick={() => setViewsign(false)}
                    />
                  </div>
                </div>
                <div className="ml-2 w-full">
                  <Connect />
                </div>
              </div>
            </div>
          </motion.main>
        )}
      </div>
      <div
        className={`${pathname === "/search" && "border-b border-[#3F3F46]"}`}
      ></div>
    </div>
  );
};

export default Header;
