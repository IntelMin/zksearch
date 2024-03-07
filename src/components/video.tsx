import React from "react";

// Define the props for your VideoCard component
interface VideoCardProps {
  imageUrl: string;
  title: string;
  url: string;
  duration?: string;
}

// Use the custom Image component within your VideoCard component
const VideoCard: React.FC<VideoCardProps> = ({
  imageUrl,
  title,
  url,
  duration,
}) => {
  return (
    <div className="content-div w-/6 content-group-right1-video video-container mr-1.5 rounded-2xl p-4">
      <div className="mb-3 h-6 text-white">
        <div className="image-container">
          <a href={url} rel="noopener noreferrer">
            <img
              className="mr-2 inline-block rounded-lg"
              src={imageUrl}
              alt={title}
              style={{ width: "100%", height: "100px", marginLeft: "4px" }}
            />
          </a>
        </div>
        <p className="text-truncate text-lg">{title}</p>
        {duration && (
          <p className="text-truncate video-time-container text-lg">
            {duration}
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
