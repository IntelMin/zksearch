// components/RelevantLinks.js

import { OrganicResult } from "@/data/ducktypes";
import React from "react";

const RelevantLinks: React.FC<{ links: OrganicResult[] }> = ({ links }) => {
  return (
    <div className="content-div mb-4 h-[66%] overflow-scroll rounded-2xl p-4">
      <p className="mb-3 text-lg text-white">Relevant Links:</p>

      <div className="relevant-links">
        {links.map((link, index) => (
          <div key={link.link} className="relevant-link">
            {" "}
            {/* Use link.link as the key */}
            <p className="description-color text-base">
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
    </div>
  );
};

export default RelevantLinks;
