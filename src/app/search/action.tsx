"use server";

import { AxonDataEntry, DataEntry } from "@/data/corceltypes";
import { RelatedSearch, Result } from "@/data/ducktypes";

const { getJson } = require("serpapi");

// Accessing an environment variable directly
const corcel_api_key: string = process.env.CORCELAPIKEY || "";
const serp_api_key: string = process.env.SERPAPIKEY || "";

async function fetchDuckData(query: string): Promise<Result> {
  return new Promise((resolve, reject) => {
    getJson(
      {
        engine: "duckduckgo",
        q: query,
        api_key: serp_api_key,
      },
      (json: Result) => {
        if (json.related_searches) {
          // const domain = `${window.location.protocol}//${window.location.hostname}`;
          const new_relates = json.related_searches.map(
            (value: RelatedSearch, index: number): RelatedSearch => {
              // Parse the original URL
              const parsedUrl = new URL(value.link);

              // Extract the query string
              const queryString = parsedUrl.search;

              return {
                link: `/search${queryString}`,
                query: value.query,
              };
            }
          );
          json.related_searches = new_relates;
        }
        resolve(json); // Resolve the promise with the json result
      }
    );
  });
}

async function fetchCorcelText(query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: corcel_api_key,
      },
      body: JSON.stringify({
        model: "cortext-lite",
        stream: false,
        miners_to_query: 1,
        top_k_miners_to_query: 40,
        ensure_responses: true,
        messages: [{ role: "user", content: query }],
      }),
    };

    fetch("https://api.corcel.io/cortext/text", options)
      .then((response) => response.json())
      .then((response: DataEntry[]) => resolve(response))
      .catch((err) => console.error(err));
  });
}

async function fetchCorcelImage(query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: corcel_api_key,
      },
      body: JSON.stringify({
        messages: query,
        model: "cortext-image",
        style: "natural",
        size: "1024x1024",
        quality: "standard",
        miners_to_query: 1,
        top_k_miners_to_query: 180,
        ensure_responses: true,
      }),
    };

    fetch("https://api.corcel.io/cortext/image", options)
      .then((response) => response.json())
      .then((response: AxonDataEntry[]) => resolve(response))
      .catch((err) => console.error(err));
  });
}

export { fetchDuckData, fetchCorcelText, fetchCorcelImage };
