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
    <div className="content-div rounded-2xl mb-4 p-4 video-containers">
      <div className="mb-3 h-6 text-white flex items-center">
        {/* Replace img with Image from next/image */}
        <div className="h-5 w-5 text-gray-500 mr-3 relative">
          <Image
            src="/search-normal.svg"
            alt="Search Icon"
            layout="fill" // Use either 'fill' or provide 'width' and 'height'
            objectFit="contain"
          />
        </div>
        <p className="text-base inline-block relatedlink-text-container">
          <Link href={link}>{query}</Link>
        </p>
      </div>
    </div>
  );
};

export default RelatedLink;
