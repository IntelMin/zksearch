import Image from "next/image";
import React from "react";

const placeholderImageUrl = "./placeholder-img.svg";

// Define the props for your ImageCard component
interface ImageCardProps {
  imageUrl: string;
  title: string;
  url: string;
}

// Use the custom Image component within your ImageCard component
const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, title, url }) => {
  const [error, setError] = React.useState(false);

  const handleImgError = () => {
    setError(true);
  };

  return (
    <div
      className="content-div video-container content-group-right1-video mr-1.5 rounded-xl p-3"
      style={{ background: "rgba(255, 255, 255, 0.05)" }}
    >
      <div className="mb-3 h-6 text-white">
        <div className="image-container">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square"
          >
            <Image
              className="mr-2 inline-block aspect-square rounded-lg bg-cover duration-100 ease-in-out hover:scale-[1.1] hover:transition-all"
              src={error ? placeholderImageUrl : imageUrl}
              alt={title}
              width={500}
              height={500}
              onError={handleImgError}
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
