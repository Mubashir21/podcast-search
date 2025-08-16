import { Podcast } from "@/types/podcast";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Music, Calendar } from "lucide-react";
import Link from "next/link";

interface PodcastCardProps {
  podcast: Podcast;
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              {podcast.artworkUrl100 ? (
                <Image
                  src={podcast.artworkUrl100}
                  alt={podcast.trackName}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <Music className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base leading-tight line-clamp-2 mb-1">
                {podcast.trackName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {podcast.artistName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {podcast.primaryGenreName && (
              <Badge variant="secondary" className="text-xs">
                {podcast.primaryGenreName}
              </Badge>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(podcast.createdAt)}</span>
            </div>
          </div>

          <Separator />

          {podcast.trackViewUrl && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link
                href={podcast.trackViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-3 w-3" />
                View in iTunes
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
