import React from "react";
import Image from "next/image";
// Define the props for your ImageCard component
interface ImageCardProps {
  imageUrl: string;
  title: string;
  url: string;
}

// Use the custom Image component within your ImageCard component
const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, title, url }) => {
  return (
    <div className="content-div w-/6 content-group-right1-video video-container mr-1.5 rounded-2xl p-4">
      <div className="mb-3 h-6 text-white">
        <div className="image-container">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Image
              width={48}
              height={48}
              className="mr-2 inline-block rounded-lg"
              src={imageUrl}
              alt={title}
              style={{ width: "160px", height: "100px", marginLeft: "4px" }}
            />
          </a>
        </div>
        <p className="text-truncate text-lg">{title}</p>
      </div>
    </div>
  );
};

export default ImageCard;
