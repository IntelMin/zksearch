"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import React, { useEffect, useState } from "react";

// Define an interface for the component props
interface SummaryProps {
  description: string | undefined;
}

// Use the props interface in the function signature
const Summary: React.FC<SummaryProps> = ({ description }) => {
  const [ state, setState ] = useState("")

  useEffect(() => {
    const chunks = description?.split(" ");
    let currentIndex = 0;
    let buffer = '';
    if (chunks?.length) {
      const intervalId = setInterval(() => {
        if (currentIndex < chunks?.length) {
          buffer = buffer + " " + chunks[currentIndex];
          setState(buffer);
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 100);
    }
  },[description])
  
  return (
    <ScrollArea className="content-div rounded-xl mb-4 p-4">
      <p className="text-white text-lg mb-3">Summary</p>
      {description?.split(". ").map((des: string, index)=>
        <p key={index} className="text-base description-color">{des+"."}</p>)}
    </ScrollArea>
  );
};

export default Summary;
