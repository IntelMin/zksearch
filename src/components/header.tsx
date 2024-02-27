'use client';

import React from "react";
import Image from "next/image";
import SearchBox from "./searchbox";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="p-5 text-sm text-gray-700">
      {pathname === "/search" && (
        <div className="flex space-x-4 items-center w-full">
          <div style={{ marginLeft: "15px" }}>
            <Image width={48} height={48} src="/z.png" alt="LOGO" />
          </div>
          <SearchBox />
        </div>
      )}
    </header>
  );
};

export default Header;
