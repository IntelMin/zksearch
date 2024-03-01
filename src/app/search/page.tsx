"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Result } from "../../data/ducktypes";
import Summary from "@/components/summary";
import RelevantLinks from "@/components/relevantlinks";
import RelatedLink from "@/components/relatedlink";
import ImageCard from "@/components/image";
import VideoCard from "@/components/video";
import { AxonDataEntry, DataEntry } from "@/data/corceltypes";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      setSummary(data)
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid data format received from server');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchDuckData() {
    try {
      const response = await fetch("/api/duck", {
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

  useEffect(() => {
    setLoading(true);
    fetchDuckData();
    fetchCorcelText();
    setLoading(false);
  }, [q])

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, [])
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bottom-0 w-full flex justify-center mt-28 flex-col xl:flex-row">
          <div className="flex-auto w-full xl:w-3/5" style={{ marginBottom: "100px" }}>
            <div className="content-group-div mx-12 rounded-2xl p-4 content-group-left xl:ml-12 xl:mr-4">
              {summary ? summary.length > 0 && (
                <Summary description={summary[0].choices[0].delta.content} />
              ) : <div className="text-white text-2xl text-center">loading...</div>}
              {result && <RelevantLinks links={result.organic_results} />}
            </div>
          </div>

          <div className="flex-auto w-full xl:w-2/5">
            {result && result.inline_images && (
              <div className="content-group-div mx-12 xl:ml-4 xl:mr-12 mb-4 rounded-2xl p-4 content-group-right-first content-group-right1 overflow-hidden ">
                <p className="text-white text-lg mb-3">Image</p>
                <div className="content-group-video">
                  <ScrollArea className="mb-3 h-[24vh]">
                    {result.inline_images.map((image, index) => (
                      <ImageCard
                        key={index}
                        imageUrl={image.thumbnail}
                        title={image.title}
                        url={image.link}
                      />
                    ))}
                  </ScrollArea>
                </div>
              </div>
            )}
            {result && result.inline_videos && (
              <div className="content-group-div mx-12 xl:ml-4 xl:mr-12 mb-4 rounded-2xl p-4 content-group-right-first content-group-right1 overflow-hidden ">
                <p className="text-white text-lg mb-3">Video</p>
                <div className="content-group-video">
                  <ScrollArea className="mb-3 h-[24vh]">
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
                  </ScrollArea>
                </div>
              </div>
            )}

            <ScrollArea className="content-group-div mx-12 xl:ml-4 xl:mr-12 rounded-2xl p-4 content-group-right-first content-group-right2 overflow-hidden h-[19vh]">
              {result ?
                result.related_searches &&
                result.related_searches.map((related, index) => (
                  <RelatedLink
                    key={index}
                    link={related.link}
                    query={related.query}
                  />
                )): <div className="text-white text-2xl text-center">loading...</div>}
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
