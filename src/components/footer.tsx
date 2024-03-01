"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoImg from "../../public/logo.svg";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer
      className={`w-full px-10 fixed bottom-0 bg-opacity-70 ${
        pathname === "/search" && "backdrop-blur"
      }`}
    >
      <div className="mx-auto flex w-full items-center py-8">
        <Image
          width={36}
          height={36}
          src={logoImg}
          className="footerImg ml-4"
          alt="logoimg"
        />
        <p className="mx-2 text-white">ZKML</p>
        <div className="ml-auto flex">
          <p className="mx-4 text-sm text-white"> {"Privacy Policy"}</p>
          <p className="mx-4 text-sm text-white"> {"|"}</p>
          <Image
            src={"./twitter-x.svg"}
            width={16}
            height={16}
            alt="twitter"
            className="twiterIcon"
          />
          <p className="mx-4 text-sm text-white"> {"|"}</p>
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
