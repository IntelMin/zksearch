interface GoogleSearchResponse {
    kind: string;
    url: UrlTemplate;
    queries: Queries;
    context: Context;
    searchInformation: SearchInformation;
    items: OrganicResult[];
  }
  
  interface UrlTemplate {
    type: string;
    template: string;
  }
  
  interface Queries {
    request: QueryRequest[];
    nextPage: QueryRequest[];
  }
  
  interface QueryRequest {
    title: string;
    totalResults: string;
    searchTerms: string;
    count: number;
    startIndex: number;
    inputEncoding: string;
    outputEncoding: string;
    safe: string;
    cx: string;
  }
  
  interface Context {
    title: string;
  }
  
  interface SearchInformation {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  }
  
  interface OrganicResult {
    kind: string;
    title: string;
    htmlTitle: string;
    link: string;
    displayLink: string;
    snippet: string;
    htmlSnippet: string;
    cacheId?: string;
    formattedUrl: string;
    htmlFormattedUrl: string;
    pagemap?: PageMap;
  }
  
  interface PageMap {
    cse_thumbnail?: CseThumbnail[];
    metatags?: MetaTag[];
    cse_image?: CseImage[];
  }
  
  interface CseThumbnail {
    src: string;
    width: string;
    height: string;
  }
  
  interface MetaTag {
    [key: string]: string;
  }
  
  interface CseImage {
    src: string;
  }
  
export type { GoogleSearchResponse, OrganicResult };