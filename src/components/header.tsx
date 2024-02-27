'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SearchBox from "./searchbox";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion"
import { Connect } from "./connect";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

import logoImg from "../../public/logo.svg";
import userImg from "../../public/user.svg";
import closeImg from "../../public/close.svg";

const variants = {
  hidden: { opacity: 0, x: 200, y: -20 },
  enter: { opacity: 1, x: 50, y: -20 },
}

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
    if(!address){
      router.push("/");
    }
  }, [])

  return (
    <div className={`px-10 fixed w-full bg-opacity-70 ${pathname === "/search" && 'bg-black'}`}>
      <div className="w-full flex px-4 py-6">
        {pathname === "/search" && (
          <div className="flex">
            <Image width={48} height={48} src={logoImg} alt="LOGO" className="mr-8" />
            <SearchBox />
          </div>
        )}
        <div className="flex cursor-pointer rounded-full bg-stone-900 border bg-opacity-70 p-4 w-12 h-12 hover:bg-stone-500 hover:text-stone-700 ml-auto" onClick={() => setViewsign(!viewsign)}>
          <Image src={userImg} alt={userImg}></Image>
        </div>
        {viewsign &&
          <motion.main
            variants={variants}
            initial="hidden"
            animate="enter"
            transition={{ type: "linear" }}
          ><div ref={ref} className="flex fade fixed ml-auto w-[300px] bg-opacity-30 rounded-2xl border border-stone-500 right-20 top-20 h-[160px] bg-stone-900">
              <div className="w-1/4 flex border-r border-stone-500">
                <Image width={48} height={48} src={logoImg} alt="LOGO" className="mx-auto" />
              </div>
              <div className="w-full flex flex-col">
                <div className="w-full flex flex-row">
                  <div className="w-5/8 px-4 pt-2">
                    <p className="text-white text-sm">Sign In With Wallet</p>
                    <p className="text-white text-sm">To ZKML AI Search</p>
                    <p className="text-stone-500 text-sm my-3">You can see better result by sign in</p>
                  </div>
                  <div className="w-1/8 p-2">
                    <Image width={36} height={36} src={closeImg} alt="close" className="ml-auto cursor-pointer rounded-full" onClick={() => setViewsign(false)} />
                  </div>
                </div>
                <div className="w-full ml-2">
                  <Connect />
                </div>
              </div>

            </div>
          </motion.main>
        }
      </div>
    </div>
  );
};

export default Header;
