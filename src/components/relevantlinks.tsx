// components/RelevantLinks.js

import { OrganicResult } from "@/data/ducktypes";
import React from "react";

const RelevantLinks: React.FC<{ links: OrganicResult[] }> = ({ links }) => {
  return (
    <div className="content-div rounded-2xl mb-4 p-4">
      <p className="text-white text-lg mb-3">Relevant Links:</p>

      <div className="relevant-links">
        {links.map((link, index) => (
          <div key={link.link} className="relevant-link">
            {" "}
            {/* Use link.link as the key */}
            <p className="text-base description-color">
              {index + 1}.{" "}
              <a href={link.link} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </p>
            <br />
            <p className="text-base description-color">{link.snippet}</p>{" "}
            {/* Use link.snippet */}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelevantLinks;
