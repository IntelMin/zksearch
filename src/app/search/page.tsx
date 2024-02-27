'use client'

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fetchCorcelImage, fetchCorcelText, fetchDuckData } from "./action";
import { Result } from "../../data/ducktypes";
import Summary from "@/components/summary";
import RelevantLinks from "@/components/relevantlinks";
import RelatedLink from "@/components/relatedlink";
import ImageCard from "@/components/image";
import VideoCard from "@/components/video";
import { AxonDataEntry, DataEntry } from "@/data/corceltypes";

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [result, setResult] = useState<Result | null>(null);
  const [summary, setSummary] = useState<DataEntry[] | null>(null);
  const [images, setImages] = useState<AxonDataEntry[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!q) return; // Don't run the effect if q is not available

    setLoading(true);

    fetchDuckData(q)
      .then((data: Result) => {
        setResult(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data:", error);
        setLoading(false);
      });

    fetchCorcelText(q)
      .then((data: DataEntry[]) => {
        setSummary(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data:", error);
        setLoading(false);
      });

    // Uncomment and use fetchCorcelImage if needed
    // fetchCorcelImage(q)
    //   .then((data: AxonDataEntry[]) => {
    //     setImages(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error('There was a problem fetching the data:', error);
    //     setLoading(false);
    //   });
  }, [q]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Body */}
      <div className="flex flex-col items-center">
        <div className=" bottom-0 left-0 w-full flex justify-center mt-22">
          {/* Left Group */}
          <div className="flex-auto w-3/5 " style={{ marginBottom: "100px" }}>
            <div className="content-group-div ml-10 mr-4 rounded-2xl p-4 content-group-left overflow-hidden">
              {summary && summary.length > 0 && (
                <Summary description={summary[0].choices[0].delta.content} />
              )}
              {result && <RelevantLinks links={result.organic_results} />}
            </div>
          </div>

          <div className="flex-auto w-2/5">
            {result && result.inline_images && (
              <div className="content-group-div ml-4 mb-4 mr-10 rounded-2xl p-4 content-group-right-first content-group-right1 overflow-hidden ">
                <p className="text-white text-lg mb-3">Image</p>
                <div className="content-group-video">
                  <div className="mb-3 ">
                    {result.inline_images.map((image, index) => (
                      <ImageCard
                        key={index}
                        imageUrl={image.thumbnail}
                        title={image.title}
                        url={image.link}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {result && result.inline_videos && (
              <div className="content-group-div ml-4 mb-4 mr-10 rounded-2xl p-4 content-group-right-first content-group-right1 overflow-hidden ">
                <p className="text-white text-lg mb-3">Video</p>
                <div className="content-group-video">
                  <div className="mb-3 ">
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
                  </div>
                </div>
              </div>
            )}

            <div className="content-group-div ml-4 mt-4 mr-10 rounded-2xl p-4 content-group-right-first content-group-right2 overflow-hidden">
              <p className="text-white text-lg mb-3">Related Links</p>
              {result &&
                result.related_searches &&
                result.related_searches.map((related, index) => (
                  <RelatedLink
                    key={index}
                    link={related.link}
                    query={related.query}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
