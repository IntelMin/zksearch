import React from "react";

// Define the props for your ImageCard component
interface ImageCardProps {
  imageUrl: string;
  title: string;
  url: string;
}

// Use the custom Image component within your ImageCard component
const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, title, url }) => {
  return (
    <div className="content-div w-full h-full mr-1.5 rounded-2xl p-4 content-group-right1-video video-container">
      <div className="mb-3 text-white">
        <div className="image-container">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img
              className="inline-block mr-2 rounded-lg w-full h-full ml-1"
              src={imageUrl}
              alt={title}
            />
          </a>
        </div>
        <p className="text-lg text-truncate">{title}</p>
      </div>
    </div>
  );
};

export default ImageCard;
