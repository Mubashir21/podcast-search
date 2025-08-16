import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("term");

    if (!searchTerm) {
      return NextResponse.json(
        { error: "Search term is required" },
        { status: 400 }
      );
    }

    console.log("Searching for:", searchTerm);

    const itunesResponse = await axios.get("https://itunes.apple.com/search", {
      params: {
        term: searchTerm,
        media: "podcast",
        entity: "podcast",
        limit: 5,
      },
      timeout: 10000,
    });

    console.log("iTunes returned:", itunesResponse.data.resultCount, "results");

    const savedPodcasts = [];

    for (const item of itunesResponse.data.results) {
      try {
        const podcast = await prisma.podcast.upsert({
          where: { collectionId: item.collectionId },
          update: {},
          create: {
            collectionId: item.collectionId,
            trackName: item.trackName || item.collectionName || "Unknown",
            artistName: item.artistName || "Unknown Artist",
            artworkUrl100: item.artworkUrl100,
            trackViewUrl: item.trackViewUrl,
            primaryGenreName: item.primaryGenreName,
          },
        });

        savedPodcasts.push(podcast);
      } catch (dbError) {
        console.error(
          "Database error for podcast:",
          item.collectionId,
          dbError
        );
      }
    }

    console.log("Saved:", savedPodcasts.length, "podcasts to database");

    return NextResponse.json({
      success: true,
      count: savedPodcasts.length,
      data: savedPodcasts,
      searchTerm,
    });
  } catch (error) {
    console.error("Search error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: "iTunes API is currently unavailable" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Search failed. Please try again." },
      { status: 500 }
    );
  }
}
