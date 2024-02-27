import { NextResponse } from 'next/server';
import { Result, RelatedSearch } from "@/data/ducktypes";
import { getJson, BaseResponse } from 'serpapi'; // Import BaseResponse from 'serpapi'

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const { query } = json;

        // Call DuckDuckGo API directly within the POST handler
        const duckResponse = await new Promise<Result>((resolve, reject) => {
            getJson(
                {
                    engine: "duckduckgo",
                    q: query,
                    api_key: process.env.SERPAPIKEY || "",
                },
                (json: BaseResponse) => { // Adjust the type of the parameter here
                    const result = json as Result; // Convert BaseResponse to Result
                    if (result.related_searches) {
                        // Transform related_searches links
                        const newRelatedSearches = result.related_searches.map((value: RelatedSearch) => {
                            const parsedUrl = new URL(value.link);
                            const queryString = parsedUrl.search;
                            return {
                                link: `/search${queryString}`,
                                query: value.query,
                            };
                        });
                        result.related_searches = newRelatedSearches;
                    }
                    resolve(result);
                }
            ).catch((error: Error) => {
                reject(error); // Handle error from getJson
            });
        });
        
        return NextResponse.json(
            { status: 200, headers: { 'Content-Type': 'application/json' }, data: duckResponse }
        );
    } catch (error) {
        console.error('Error fetching DuckDuckGo data:', error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}