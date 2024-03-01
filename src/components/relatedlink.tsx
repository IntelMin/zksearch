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
    <div className="content-div video-containers flex items-center justify-start rounded-2xl p-4">
      <div className="flex h-6 items-center gap-2 text-white">
        {/* Replace img with Image from next/image */}
        <div className="relative h-5 px-3 text-gray-500">
          <Image
            src="/search-normal.svg"
            alt="Search Icon"
            layout="fill" // Use either 'fill' or provide 'width' and 'height'
            objectFit="contain"
          />
        </div>
        <div
          className="relatedlink-text-container inline text-base max-md:max-w-[20px]"
          style={{ maxWidth: "160px" }}
        >
          <p
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Link href={link}>{query}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelatedLink;
