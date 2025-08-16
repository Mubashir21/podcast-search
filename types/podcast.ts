export interface Podcast {
  id: number;
  collectionId: number;
  trackName: string;
  artistName: string;
  artworkUrl100?: string | null;
  trackViewUrl?: string | null;
  primaryGenreName?: string | null;
  createdAt: string;
}

export interface SearchResponse {
  success: boolean;
  count: number;
  data: Podcast[];
  searchTerm?: string;
  error?: string;
}
