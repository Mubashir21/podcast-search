# Thmanyah Podcast Search

A full-stack podcast search application that integrates with iTunes Search API and stores results in a PostgreSQL database.

## Features

- **iTunes API Integration**: Search podcasts from iTunes Store catalog
- **Database Storage**: PostgreSQL with Prisma ORM for data persistence
- **Modern UI**: Built with Next.js and shadcn/ui components
- **Responsive Design**: Works seamlessly across all device sizes
- **TypeScript**: Full type safety throughout the application
- **Error Handling**: Comprehensive error management and user feedback
- **Loading States**: Smooth user experience with loading indicators

## Tech Stack

- **Frontend & Backend**: Next.js 14 (App Router + API Routes)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Font**: Inter
- **HTTP Client**: Axios

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- npm or yarn package manager
- Docker

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/podcast_search"
```

### 3. Database Setup

```bash
# Start PostgreSQL with Docker
docker run --name postgres-podcast -e POSTGRES_PASSWORD=password -e POSTGRES_DB=podcast_search -p 5432:5432 -d postgres:15-alpine

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 4. Run Application

```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
/
├── app/
│   ├── api/podcasts/search/
│   │   └── route.ts                 # iTunes API  endpoint
│   ├── layout.tsx                   # Root layout with Inter font
│   ├── page.tsx                     # Main search page
│   ├── globals.css                  # Global styles
│   └── favicon.ico
├── components/
│   ├── ui/                          # shadcn/ui base components
|   |   ├── alert.tsx
│   │   ├── badge.tsx
|   |   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
|   |   └── separator.tsx
│   ├── SearchForm.tsx               # Search form component
│   ├── PodcastCard.tsx              # Podcast display card
|   └── responsive-container.tsx     # Responsive container component
├── lib/
│   ├── db.ts                        # Prisma client configuration
│   └── utils.ts                     # Utility functions
└── types/
    └── podcast.ts                   # TypeScript type definitions
```

## API Documentation

### Search Podcasts

```
GET /api/podcasts/search?term=<search_term>
```

**Parameters:**

- `term` (required): Search keyword or phrase

**Response:**

```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "id": 1,
      "collectionId": 1535809341,
      "trackName": "The Joe Rogan Experience",
      "artistName": "Joe Rogan",
      "artworkUrl100": "https://...",
      "trackViewUrl": "https://...",
      "primaryGenreName": "Comedy",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "searchTerm": "joe rogan"
}
```

## Database Schema

```prisma
model Podcast {
  id                Int      @id @default(autoincrement())
  collectionId      Int      @unique
  trackName         String
  artistName        String
  artworkUrl100     String?
  trackViewUrl      String?
  primaryGenreName  String?
  createdAt         DateTime @default(now())

  @@map("podcasts")
}
```

## 📋 Assignment Requirements

✅ **REST API endpoint** - Accepts search terms via query parameters  
✅ **iTunes Search API integration** - Fetches podcast data from iTunes  
✅ **Database storage** - Stores search results in PostgreSQL  
✅ **Response return** - Returns stored podcast data as JSON  
✅ **Frontend display** - Clean, responsive search interface

## Key Implementation Details

### iTunes API Integration

- Integrates with `https://itunes.apple.com/search` endpoint
- Searches specifically for podcast media type
- Handles API rate limiting and network errors
- Processes and normalizes response data

### Database Strategy

- Uses `collectionId` as unique identifier to prevent duplicates
- Implements upsert logic for efficient data storage
- Stores essential podcast metadata for quick retrieval
- Maintains creation timestamps for audit trail

### Error Handling

- Network error management with user-friendly messages
- API timeout handling
- Database error recovery
- Form validation and user feedback

### Performance Optimizations

- Next.js Image component for optimized podcast artwork loading
- Responsive design with mobile-first approach
- Efficient database queries with Prisma
- Clean component architecture for maintainability

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npx prisma studio    # Open database browser
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database

# Docker database management
docker start postgres-podcast    # Start existing container
docker stop postgres-podcast     # Stop container
docker rm postgres-podcast       # Remove container
```

## Image Configuration

The application is configured to load podcast artwork from iTunes CDN domains:

- `is1-ssl.mzstatic.com`
- `is2-ssl.mzstatic.com`
- `is3-ssl.mzstatic.com`
- `is4-ssl.mzstatic.com`
- `is5-ssl.mzstatic.com`

## Deployment Notes

For production deployment:

1. Set up PostgreSQL database on your hosting platform
2. Update `DATABASE_URL` environment variable
3. Run `npm run build` to create production build
4. Ensure all iTunes CDN domains are whitelisted for images

## Additional Features

- **Search Suggestions**: Quick search options for popular topics
- **Empty States**: Helpful guidance when no results are found
- **Loading States**: Visual feedback during search operations
- **Responsive Grid**: Adaptive layout for different screen sizes
- **External Links**: Direct links to iTunes Store for each podcast

## Technical Decisions

- **Next.js Full-Stack**: Chosen for unified development experience and API Routes
- **Prisma ORM**: Selected for type-safe database operations and easy schema management
- **shadcn/ui**: Implemented for consistent, accessible UI components
- **TypeScript**: Used throughout for better developer experience and fewer runtime errors
- **Tailwind CSS**: Utilized for rapid, responsive styling

---

**Built for Thmanyah Coding Assignment**  
**Developer**: Mubashir Mohd Shoukat  
**GitHub Repository**: https://github.com/Mubashir21/podcast-search  
**Development Time**: ~2 hour
