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
    <div
      className="content-div video-container content-group-right1-video mr-1.5 rounded-xl p-3"
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
    >
      <div className="mb-3 h-6 text-white">
        <div className="image-container">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img
              className="mr-2 inline-block rounded-lg"
              src={imageUrl}
              alt={title}
              style={{ width: "100%", height: "100px" }}
            />
          </a>
        </div>
        <p className="text-truncate text-lg">{title}</p>
      </div>
    </div>
  );
};

export default ImageCard;
