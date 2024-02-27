import React from "react";

// Define an interface for the component props
interface SummaryProps {
  description: string | undefined;
}

// Use the props interface in the function signature
const Summary: React.FC<SummaryProps> = ({ description }) => {
  return (
    <div className="content-div rounded-2xl mb-4 p-4 ">
      <p className="text-white text-lg mb-3">Summary</p>
      <p className="text-base description-color">{description}</p>
    </div>
  );
};

export default Summary;
