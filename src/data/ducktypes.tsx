"use client";

interface SearchMetadata {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  duckduckgo_url: string;
  raw_html_file: string;
  prettify_html_file: string;
  total_time_taken: number;
}

interface SearchParameters {
  engine: string;
  q: string;
  kl: string;
}

interface SearchInformation {
  organic_results_state: string;
}

interface Ad {
  position: number;
  title: string;
  link: string;
  source: string;
  snippet: string;
  sitelinks: SiteLink[];
}

interface SiteLink {
  title: string;
  link: string;
  snippet: string;
}

interface OrganicResult {
  position: number;
  title: string;
  link: string;
  snippet: string;
  favicon: string;
  sitelinks?: SiteLink[]; // Optional property, as not all results have sitelinks
  date_raw?: string; // Optional property, as not all results have a raw date
  date?: string; // Optional property, as not all results have a formatted date
}

interface KnowledgeGraph {
  title: string;
  description: string;
  thumbnail: string;
  facts: Facts;
  profiles: Profile[];
  related_topics: RelatedTopic[];
}

interface Facts {
  formerly_called: string;
  type: string;
  traded_as: string;
  isin: string;
  industry: string;
  founded: string;
  founders: string;
  number_of_locations: string;
  area_served: string;
  key_people: string;
  revenue: string;
  operating_income: string;
  total_assets: string;
  total_equity: string;
  number_of_employees: string;
  subsidiaries: string;
}

interface Profile {
  name: string;
  link: string;
  thumbnail: string;
}

interface RelatedTopic {
  query: string;
  link: string;
}

interface NewsResult {
  position: number;
  title: string;
  link: string;
  snippet: string;
  source: string;
  date: string;
  thumbnail: string;
}

interface RelatedSearch {
  query: string;
  link: string;
}

interface SerpApiPagination {
  next: string;
}

interface InlineImage {
  position: number;
  title: string;
  link: string;
  thumbnail: string;
  image: string;
}

interface InlineVideo {
  position: number;
  title: string;
  link: string;
  duration: string;
  platform: string;
  date: string;
  views: number;
  thumbnail: string;
}

interface Result {
  search_metadata: SearchMetadata;
  search_parameters: SearchParameters;
  search_information: SearchInformation;
  ads: Ad[];
  organic_results: OrganicResult[];
  knowledge_graph: KnowledgeGraph;
  news_results: NewsResult[];
  related_searches: RelatedSearch[];
  serpapi_pagination: SerpApiPagination;
  inline_images: InlineImage[];
  inline_videos: InlineVideo[];
}

export type { Result, OrganicResult, RelatedSearch };
