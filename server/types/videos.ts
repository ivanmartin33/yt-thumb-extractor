export interface VideoFront {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  };
  channelTitle: string;
  channelID: string;
  channelThumbnail: Thumbnail;
  tags: string[];
  viewCount: string;
  duration: string;
  categoryId: number;
  liveBroadcastContent: string;
  defaultLanguage: string;
  localized: {
    title: string;
    description: string;
  };
}

export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  };
  channelTitle: string;
  tags: string[];
  categoryId: number;
  liveBroadcastContent: string;
  defaultLanguage: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage: string;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Video {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippet;
  statistics: Statistics;
  contentDetails: ContentDetails

}

export interface VideoListResponse {
  kind: string;
  etag: string;
  items: Video[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

interface ContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  regionRestriction: {
    allowed: string[];
    blocked: string[];
  };
  contentRating: {
    [key: string]: string; // Clé dynamique pour les propriétés de notation content rating
  };
  projection: string;
  hasCustomThumbnail: boolean;
}