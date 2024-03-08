import React from "react";
import Image from "next/image";
import Link from "next/link";

// Define the prop types using TypeScript
type RelatedLinkProps = {
  link: string;
  query: string;
};

const RelatedLink: React.FC<RelatedLinkProps> = ({ link, query }) => {
  return (
    <div
      className="content-div video-containers mb-4 rounded-xl p-4"
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
    >
      <div className="flex h-6 items-center text-white">
        {/* Replace img with Image from next/image */}
        <div className="relative mr-3 h-5 w-5 text-gray-500">
          <Image
            src="/search-normal.svg"
            alt="Search Icon"
            layout="fill" // Use either 'fill' or provide 'width' and 'height'
            // objectFit="contain"
            className="object-contain"
          />
        </div>
        <p className="relatedlink-text-container text-truncate inline-block text-base">
          <Link href={link}>{query}</Link>
        </p>
      </div>
    </div>
  );
};

export default RelatedLink;
