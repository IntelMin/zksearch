'use client';

import React from "react";
import Image from "next/image";
import SearchBox from "./searchbox";
import { usePathname } from "next/navigation";
import logoImg from "../../public/logo.svg";
import userImg from "../../public/user.svg";

const Header = () => {
  const pathname = usePathname();
  return (
    <div className={`px-10 fixed w-full bg-opacity-70 ${pathname === "/search" && 'bg-black'}`}>
      <div className="w-full flex px-4 py-6">
        {pathname === "/search" && (
          <div className="flex">
            <Image width={48} height={48} src={logoImg} alt="LOGO" className="mr-8"/>
            <SearchBox />
          </div>
        )}
        <div className="flex rounded-full bg-slate-600 p-4 w-12 h-12 hover:bg-stone-500 hover:text-stone-700 ml-auto">
          <Image src={userImg} alt={userImg}></Image>
        </div>
      </div>
    </div>
  );
};

export default Header;
