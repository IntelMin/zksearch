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
    <div className="content-div w-/6 mr-1.5 rounded-xl p-4 content-group-right1-video video-container">
      <div className="mb-3 h-6 text-white">
        <div className="image-container">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img
              className="inline-block mr-2 rounded-lg"
              src={imageUrl}
              alt={title}
              style={{ width: "100%", height: "130px", marginLeft: "4px" }}
            />
          </a>
        </div>
        <p className="text-lg text-truncate">{title}</p>
      </div>
    </div>
  );
};

export default ImageCard;
