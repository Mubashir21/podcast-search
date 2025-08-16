"use client";

import { useState } from "react";
import SearchForm from "@/components/search-form";
import PodcastCard from "@/components/podcast-card";
import { ResponsiveContainer } from "@/components/responsive-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Podcast } from "@/types/podcast";
import { Search, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

export default function HomePage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (term: string) => {
    setLoading(true);
    setError(null);
    setSearchTerm(term);

    try {
      const response = await axios.get("/api/podcasts/search", {
        params: { term },
      });
      setPodcasts(response.data.data);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search podcasts. Please try again.");
      setPodcasts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-6 py-8 px-6">
        {/* Header */}
        <ResponsiveContainer maxWidth="3xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Thmanyah Podcast Search
            </h1>
            <p className="text-muted-foreground">
              Discover podcasts from iTunes Store
            </p>
          </div>
        </ResponsiveContainer>

        {/* Search */}
        <ResponsiveContainer maxWidth="3xl">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </ResponsiveContainer>

        {/* Error State */}
        {error && (
          <ResponsiveContainer maxWidth="3xl">
            <Card>
              <CardContent>
                <div className="flex items-center gap-3 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              </CardContent>
            </Card>
          </ResponsiveContainer>
        )}

        {/* Loading State */}
        {loading && (
          <ResponsiveContainer maxWidth="3xl">
            <Card>
              <CardContent>
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <p className="text-muted-foreground">Searching podcasts...</p>
                </div>
              </CardContent>
            </Card>
          </ResponsiveContainer>
        )}

        {/* Results */}
        {podcasts.length > 0 && !loading && (
          <>
            {/* Results header */}
            <ResponsiveContainer maxWidth="3xl">
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold">Search Results</h2>
                      <p className="text-sm text-muted-foreground">
                        Found {podcasts.length} podcasts for "{searchTerm}"
                      </p>
                    </div>
                    <Badge variant="secondary">{podcasts.length} results</Badge>
                  </div>
                </CardContent>
              </Card>
            </ResponsiveContainer>

            {/* Results grid */}
            <ResponsiveContainer maxWidth="3xl">
              <div className="grid gap-6 md:grid-cols-2">
                {podcasts.map((podcast) => (
                  <PodcastCard key={podcast.id} podcast={podcast} />
                ))}
              </div>
            </ResponsiveContainer>
          </>
        )}

        {/* No Results */}
        {!loading && podcasts.length === 0 && searchTerm && !error && (
          <ResponsiveContainer maxWidth="3xl">
            <Card>
              <CardContent className="text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try different keywords or check your spelling
                </p>
              </CardContent>
            </Card>
          </ResponsiveContainer>
        )}

        {/* Initial State */}
        {!loading && !searchTerm && (
          <ResponsiveContainer maxWidth="3xl">
            <Card>
              <CardContent className="text-center">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-lg font-semibold mb-2">
                  Search for podcasts
                </h3>
                <p className="text-muted-foreground mb-4">
                  Enter a search term above to find podcasts
                </p>
                <div className="flex justify-center gap-2">
                  {["Formula 1", "Technology", "Football"].map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => handleSearch(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
