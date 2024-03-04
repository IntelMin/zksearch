"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Result } from "../../data/googletypes";
import Summary from "@/components/summary";
import RelevantLinks from "@/components/relevantlinks";
import RelatedLink from "@/components/relatedlink";
import ImageCard from "@/components/image";
import VideoCard from "@/components/video";
import { AxonDataEntry, DataEntry } from "@/data/corceltypes";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { address, isConnected } = useAccount();

  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [result, setResult] = useState<Result>();
  const [summary, setSummary] = useState<DataEntry[]>();
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchCorcelText() {
    try {
      const response = await fetch("/api/corcel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: q }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }

      const responseData = await response.json();

      const { data } = responseData;
      setSummary(data);
      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchDuckData() {
    try {
      const response = await fetch("/api/duck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: q }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }

      const responseData = await response.json();

      const { data } = responseData;

      setResult(data);
      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchGoogleData() {
    try {
      const response = await fetch("/api/google", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: q }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const responseData = await response.json();

      const { data } = responseData;

      setResult(data)
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid data format received from server');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      // await fetchDuckData();
      await fetchGoogleData();
      await fetchCorcelText();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [q]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bottom-0 w-full flex justify-center mt-[8rem] flex-col xl:flex-row mb-[120px]">
          <div
            className="flex-auto w-full xl:w-3/5"
          >
            <div className="content-group-div mx-12 rounded-2xl p-4 content-group-left xl:ml-12 xl:mr-4">
              {loading ? (
                <div className="content-div rounded-2xl mb-4 p-4 flex flex-col gap-4">
                  <Skeleton className="w-32 h-7 rounded-full" />
                  <Skeleton className="w-[40vw] h-5 rounded-full" />
                  <Skeleton className="w-[42vw] h-5 rounded-full" />
                  <Skeleton className="w-[36vw] h-5 rounded-full" />
                  <Skeleton className="w-[30vw] h-5 rounded-full" />
                </div>
              ) : (
                <>
                  {summary && summary.length > 0 && (
                    <Summary
                      description={summary[0].choices[0].delta.content}
                    />
                  )}
                </>
              )}
              {loading ? (
                <div className="content-div rounded-2xl mb-4 p-4 flex flex-col gap-8">
                  <Skeleton className="w-32 h-7 rounded-full" />
                  <div className="flex flex-col gap-6">
                    <Skeleton className="w-[38vw] h-5 rounded-full" />
                    <div className="flex flex-col gap-4">
                      <Skeleton className="w-[45vw] h-5 rounded-full" />
                      <Skeleton className="w-[48vw] h-5 rounded-full" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <Skeleton className="w-[38vw] h-5 rounded-full" />
                    <div className="flex flex-col gap-4">
                      <Skeleton className="w-[45vw] h-5 rounded-full" />
                      <Skeleton className="w-[48vw] h-5 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>) : (<>
                {result && <RelevantLinks links={result.items} />}
              </>)}
            </div>
          </div>

          <div className="flex-auto w-full xl:w-2/5">
            {result && result.items && (
              <div className="content-group-div mx-12 xl:ml-4 xl:mr-12 mb-4 rounded-2xl p-4 content-group-right-first content-group-right1 overflow-hidden ">
                <p className="text-white text-lg mb-3">Image</p>
                <div className="content-group-video">
                  {loading ? (
                    <div className="flex flex-row justify-around">
                      <Skeleton className="w-[10vw] h-[15vh]" />
                      <Skeleton className="w-[10vw] h-[15vh]" />
                      <Skeleton className="w-[10vw] h-[15vh]" />
                    </div>) : (<>
                      {result.items.map((image, index) => {
                          return (
                          image.pagemap.cse_image &&
                          <ImageCard
                            key={index}
                            imageUrl={image.pagemap.cse_image[0].src}
                            title={image.title}
                            url={image.pagemap.cse_image[0].src}
                          />
                          )
                        } 
                      )}
                    </>)}
                  </ScrollArea>
                </div>
              </div>
            )}
            {/* {result && result.inline_videos && (
              <div className="content-group-div mx-12 xl:ml-4 xl:mr-12 mb-4 rounded-2xl p-4 content-group-right-first content-group-right1 overflow-hidden ">
                <p className="text-white text-lg mb-3">Video</p>
                <div className="content-group-video">
                  {loading ? (
                    <div className="flex flex-row justify-around">
                      <Skeleton className="w-[10vw] h-[15vh]" />
                      <Skeleton className="w-[10vw] h-[15vh]" />
                      <Skeleton className="w-[10vw] h-[15vh]" />
                    </div>
                  ) : (
                    <>
                      {result &&
                        result.inline_videos &&
                        result.inline_videos.map((video, index) => (
                          <VideoCard
                            key={index}
                            imageUrl={video.thumbnail}
                            title={video.title}
                            url={video.link}
                            duration={video.duration}
                          />
                        ))}
                    </>
                  )}
                </div>
              </div>
            )} */}

            <ScrollArea className="content-group-div mx-12 xl:ml-4 xl:mr-12 rounded-2xl p-4 content-group-right-first content-group-right2 overflow-hidden h-[19vh]">
              {loading ? (<div className="flex flex-row justify-around">
                <Skeleton className="w-[14vw] h-[5vh]" />
                <Skeleton className="w-[14vw] h-[5vh]" />
              </div>) : (<>
                {/* {result &&
                  result.related_searches &&
                  result.related_searches.map((related, index) => (
                    <RelatedLink
                      key={index}
                      link={related.link}
                      query={related.query}
                    />
                  ))
                } */}
              </>)}
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
