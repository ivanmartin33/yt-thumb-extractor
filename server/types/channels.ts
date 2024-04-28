export interface ChannelListResponse {
  kind: "youtube#channelListResponse";
  etag: string;
  pageInfo: PageInfo;
  items: Channel[];
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Channel {
  kind: "youtube#channel";
  etag: string;
  id: string;
  snippet: ChannelSnippet;
}

export interface ChannelSnippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: { [key: string]: Thumbnail };
  localized: LocalizedSnippet;
  country: string;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface LocalizedSnippet {
  title: string;
  description: string;
}