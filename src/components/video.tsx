import React from "react";
import Image from "next/image";

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
    <div className="content-div w-/6 mr-1.5 rounded-2xl p-4 content-group-right1-video video-container">
      <div className="mb-3 h-6 text-white">
        <div className="image-container">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Image
              className="inline-block mr-2 rounded-lg ml-1"
              src={imageUrl}
              alt={title}
              width={160}
              height={160}
            />
          </a>
        </div>
        <p className="text-lg text-truncate">{title}</p>
        {duration && (
          <p className="text-lg text-truncate video-time-container">
            {duration}
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
