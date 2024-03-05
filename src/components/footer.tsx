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
      <div className="mx-auto flex w-full items-center border-t border-[#3F3F46] py-5">
        <a
          href="https://www.zkml.systems/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={30}
            height={30}
            src={logoImg}
            className="footerImg ml-4"
            alt="logoimg"
          />
        </a>

        <a
          href="https://www.zkml.systems/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="mx-2 text-white">ZKML</p>
        </a>

        <div className="ml-auto flex">
          <a
            href="https://zkml.gitbook.io/doc/introduction"
            className="whitepaper-link mx-4 text-sm"
          >
            Whitepaper
          </a>

          <p className="mx-4 text-sm text-white">{"|"}</p>
          <a
            href="https://twitter.com/ZKMLsystems"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"./twitter-x.svg"}
              width={16}
              height={16}
              alt="twitter"
              className="twitterIcon"
            />
          </a>
          <p className="mx-4 text-sm text-white">{"|"}</p>
          <a
            href="https://t.me/zkmlsystems"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width={16}
              height={16}
              src={"./telegram-out.svg"}
              alt="telegram"
              className="telegramIcon mr-4"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
