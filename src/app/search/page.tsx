"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GoogleSearchResponse } from "../../data/googletypes";
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
  const [result, setResult] = useState<GoogleSearchResponse>();
  const [suggest, setSuggest] = useState<string[]>([]);
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
      // if (!data || !Array.isArray(data)) {
      //   throw new Error("Invalid data format received from server");
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchSuggestionData() {
    try {
      const response = await fetch("/api/suggest", {
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

      setSuggest(data);
      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      // await fetchDuckData();
      await fetchCorcelText();
      await fetchGoogleData();
      await fetchSuggestionData();
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
      <div className="flex flex-col items-center md:space-auto space-y-2">
        <div className="bottom-0 w-full flex justify-center mt-[5rem]  flex-col xl:flex-row mb-[60px]">
          <div className="flex-auto w-full xl:w-3/5">
            <div className="content-group-div md:mx-12 mx-4 rounded-xl p-4 content-group-left xl:ml-12 xl:mr-4">
              {loading ? (
                <div className="content-div mb-4 flex flex-col gap-4 rounded-2xl p-4">
                  <Skeleton className="h-7 w-32 rounded-full" />
                  <Skeleton className="h-5 w-[40vw] rounded-full" />
                  <Skeleton className="h-5 w-[42vw] rounded-full" />
                  <Skeleton className="h-5 w-[36vw] rounded-full" />
                  <Skeleton className="h-5 w-[30vw] rounded-full" />
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
                <div className="content-div mb-4 flex flex-col gap-8 rounded-2xl p-4">
                  <Skeleton className="h-7 w-32 rounded-full" />
                  <div className="flex flex-col gap-6">
                    <Skeleton className="h-5 w-[38vw] rounded-full" />
                    <div className="flex flex-col gap-4">
                      <Skeleton className="h-5 w-[45vw] rounded-full" />
                      <Skeleton className="h-5 w-[48vw] rounded-full" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <Skeleton className="h-5 w-[38vw] rounded-full" />
                    <div className="flex flex-col gap-4">
                      <Skeleton className="h-5 w-[45vw] rounded-full" />
                      <Skeleton className="h-5 w-[48vw] rounded-full" />
                    </div>
                  </div>
                </div>
              ) : (
                <>{result && <RelevantLinks links={result.items} />}</>
              )}
            </div>
          </div>

          <div className="flex-auto w-full  xl:w-2/5 ">
            {result && result.items && (
              <div
                className="content-group-div md:mx-12 mx-4 xl:ml-4 xl:mr-12 mb-4 rounded-2xl p-4 content-group-right-first content-group-right1 overflow-hidden "
                style={{ background: "rgba(255, 255, 255, 0.06)" }}
              >
                <p className="text-white text-lg mb-3">Image</p>
                <div className="content-group-video">
                  {loading ? (
                    <div className="flex flex-row justify-around">
                      <Skeleton className="h-[15vh] w-[10vw]" />
                      <Skeleton className="h-[15vh] w-[10vw]" />
                      <Skeleton className="h-[15vh] w-[10vw]" />
                    </div>
                  ) : (
                    <>
                      {result.items.map((image, index) => {
                        return (
                          image.pagemap?.cse_image && (
                            <ImageCard
                              key={index}
                              imageUrl={image.pagemap.cse_image[0].src}
                              title={image.title}
                              url={image.link}
                            />
                          )
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            )}
            {/* {result && result.inline_videos && (
              <div className="content-group-div content-group-right-first content-group-right1 mx-12 mb-4 overflow-hidden rounded-2xl p-4 xl:ml-4 xl:mr-12">
                <p className="mb-3 text-lg text-white">Video</p>
                <div className="content-group-video">
                  {loading ? (
                    <div className="flex flex-row justify-around">
                      <Skeleton className="h-[15vh] w-[10vw]" />
                      <Skeleton className="h-[15vh] w-[10vw]" />
                      <Skeleton className="h-[15vh] w-[10vw]" />
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

            <ScrollArea
              className="content-group-div md:mx-12 mx-4 xl:ml-4 xl:mr-12 rounded-2xl p-4 pr-0 content-group-right-first content-group-right2 overflow-hidden flex justify-center "
              style={{ background: "rgba(255, 255, 255, 0.06)" }}
            >
              {loading ? (
                <div className="flex flex-row justify-around">
                  <Skeleton className="h-[5vh] w-[10vw]" />
                  <Skeleton className="h-[5vh] w-[10vw]" />
                  <Skeleton className="h-[5vh] w-[10vw]" />
                </div>
              ) : (
                <>
                  {suggest &&
                    suggest.map((sug, index) => (
                      <RelatedLink
                        key={index}
                        link={"/search?q=" + sug}
                        query={sug}
                      />
                    ))}
                </>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
