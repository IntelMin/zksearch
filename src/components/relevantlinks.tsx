// components/RelevantLinks.js
import { ScrollArea } from "@/components/ui/scroll-area";

import { OrganicResult } from "@/data/googletypes";
import React from "react";

const RelevantLinks: React.FC<{ links: OrganicResult[] }> = ({ links }) => {
  return (
    <ScrollArea className="content-div rounded-2xl mb-4 p-4 h-[37vh]">
      <p className="text-white text-lg mb-3">Relevant Links:</p>

      <div className="relevant-links">
        {links.map((link, index) => (
          <div key={link.link} className="relevant-link">
            {" "}
            {/* Use link.link as the key */}
            <p className="text-base description-color ml-2">
              {link.pagemap.cse_thumbnail && <img
                className="inline-block mr-2 rounded-lg"
                src={link.pagemap.cse_thumbnail[0]?.src}
                alt={link.title}
                style={{ width: "40px", height: "40px" }}
              />}
              {index + 1}.{" "}
              <a href={link.link} target="_blank" rel="noopener noreferrer" className="underline">
                {link.title}
              </a>
            </p>
            <br />
            <p className="text-base description-color ml-4">{link.snippet}</p>{" "}
            {/* Use link.snippet */}
            <br />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default RelevantLinks;
