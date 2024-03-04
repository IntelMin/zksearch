interface OrganicResult {
  kind: string,
  title: string,
  htmlTitle: string,
  link: string,
  displayLink: string,
  snippet: string,
  htmlSnippet: string,
  cacheId: string,
  formattedUrl: string,
  htmlFormattedUrl: string,
  pagemap: {
      cse_thumbnail: [
          {
              src: string,
              width: string,
              height: string,
          }
      ],
      metatags: any[],
      cse_image: [
          {
              src: string
          }
      ]
  }
}

interface Result {
  items: OrganicResult[];
}

export type { Result, OrganicResult };
