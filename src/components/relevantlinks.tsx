// components/RelevantLinks.js
import { ScrollArea } from "@/components/ui/scroll-area";

import { OrganicResult } from "@/data/googletypes";
import React from "react";

const RelevantLinks: React.FC<{ links: OrganicResult[] }> = ({ links }) => {
  return (
    <ScrollArea
      className="content-div mb-4 rounded-xl p-4"
      style={{ background: "rgba(255, 255, 255, 0.06)" }}
    >
      <p className="mb-3 text-lg text-white">Relevant Links:</p>

      <div className="relevant-links">
        {links.map((link, index) => (
          <div key={link.link} className="relevant-link">
            {" "}
            {/* Use link.link as the key */}
            <p className="description-color text-base underline">
              {index + 1}.{" "}
              <a href={link.link} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </p>
            <br />
            <p className="description-color text-base">{link.snippet}</p>{" "}
            {/* Use link.snippet */}
            <br />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default RelevantLinks;
