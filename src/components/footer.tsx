"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoImg from "../../public/logo.svg";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className={`w-full px-10 fixed bottom-0  bg-opacity-70 ${pathname === "/search" && 'bg-black'}`}>
      <div className="flex items-center mx-auto py-8 w-full">
        <Image width={36} height={36} src={logoImg} className="footerImg ml-4" alt="logoimg"/>
        <p className="text-white mx-2">ZKML</p>
        <div className="ml-auto flex">
          <p className="text-sm text-white mx-4"> {"Privacy Policy"}</p>
          <p className="text-sm text-white mx-4"> {"|"}</p>
          <Image
              src={"./twitter-x.svg"}
              width={16}
              height={16}
              alt="twitter"
              className="twiterIcon"
          />
          <p className="text-sm text-white mx-4"> {"|"}</p>
          <Image
              width={16}
              height={16}
              src={"./telegram-out.svg"}
              alt="telegram"
              className="twiterIcon mr-4"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
