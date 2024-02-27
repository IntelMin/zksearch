"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="footer">
      <div className="flex space-x-4 items-center">
        <img src="/z.png" className="footerImg" />
        <span className="zkmlStyle">ZKML</span>
        <div
          className="footer-right col-md-4 col-sm-6"
          style={{ marginLeft: "75%" }}
        >
          <p className="menu flex items-center  ">
            <span
              className="ads-marketing"
              style={{ color: "White", fontSize: "13px", marginRight: "15px" }}
            >
              Privacy Policy
            </span>
            <span className="ads-marketing" style={{ color: "gray" }}>
              |
            </span>
            <Image
              src={"./twitter-x.svg"}
              width={16}
              height={16}
              alt="twitter"
              className="twiterIcon"
            />
            <span className="ads-marketing" style={{ color: "gray" }}>
              |
            </span>
            <Image
              width={16}
              height={16}
              src={"./telegram-out.svg"}
              alt="telegram"
              className="twiterIcon"
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
