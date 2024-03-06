// components/RelevantLinks.js
import { ScrollArea } from "@/components/ui/scroll-area";

import { OrganicResult } from "@/data/googletypes";
import React from "react";

const RelevantLinks: React.FC<{ links: OrganicResult[] }> = ({ links }) => {
  return (
    <ScrollArea className="content-div rounded-xl mb-4 p-4">
      <p className="text-white text-lg mb-3">Relevant Links:</p>

      <div className="relevant-links">
        {links.map((link, index) => (
          <div key={link.link} className="relevant-link">
            {" "}
            {/* Use link.link as the key */}
            <a href={link.link} rel="noopener noreferrer">
              <p className="text-base underline description-color">
                {index + 1}. {link.title}
              </p>
              <br />
              <p className="text-base description-color">{link.snippet}</p>{" "}
            </a>
            {/* Use link.snippet */}
            <br />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default RelevantLinks;
