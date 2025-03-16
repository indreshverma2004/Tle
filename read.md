# Contest Tracker Application Documentation

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Application Flow](#application-flow)
3. [Key Components](#key-components)
4. [File Structure](#file-structure)
5. [API Integration](#api-integration)
6. [Authentication](#authentication)
7. [Bookmarking System](#bookmarking-system)
8. [YouTube Links Integration](#youtube-links-integration)
9. [Web Scraping](#web-scraping)

## Tech Stack

This application is built using the following technologies:

### Frontend:
- **Framework**: React (with TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Component Library**: shadcn/ui (based on Radix UI)
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Native fetch API
- **Date Handling**: Date manipulation utilities
- **Cookie Management**: js-cookie

### Backend:
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Token (JWT)
- **Scraping**: Puppeteer for extracting contest data

## Application Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  User Interface │     │  React Components│     │  Backend APIs   │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  User Actions   │────▶│  State Updates  │────▶│  API Requests   │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  UI Updates     │◀────│  State Changes  │◀────│  API Responses  │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Key Components

1. **App.tsx**: The main entry point that sets up routing and maintains global state.
2. **Index.jsx**: The contests page that fetches and displays programming contests from different platforms.
3. **ContestList.tsx**: Renders a list of contests with platform-specific components.
4. **FilterBar.tsx**: Allows users to filter contests by platform, status, and search query.
5. **BookmarkedContests.tsx**: Displays contests that users have bookmarked.
6. **Login.tsx & Signup.tsx**: Authentication pages.
7. **AddYoutube.jsx**: Admin interface to add YouTube links to contests.

## File Structure

### Frontend:
- `src/`
  - `components/`: UI components
    - `ui/`: shadcn/ui components
    - Platform-specific components (CodeForcesCard, LeetcodeUpcoming, etc.)
  - `pages/`: Route components
  - `hooks/`: Custom React hooks
  - `utils/`: Utility functions and types
  - `services/`: API service functions

### Backend:
- `backend/`
  - `.gitignore`
  - `debug.png`
  - `dp.js`
  - `index.js` (Main entry point for the backend)
  - `package.json`
  - `package-lock.json`
  - `middleware/`
    - `fetchuser.js` (Middleware for authentication)
  - `models/`
    - `auth.js` (User authentication schema)
    - `links.js` (Schema for storing YouTube links)
  - `routes/`
    - `auth.js` (Authentication routes)
    - `codechefpast.js` (CodeChef past contests API)
    - `codchefupcooming.js` (CodeChef upcoming contests API)
    - `contest.js` (Main contest fetching API)
    - `leetcodepast.js` (LeetCode past contests API)
    - `leetcode_upcomming_contest.js` (LeetCode upcoming contests API)

## API Integration

The application integrates with backend APIs to fetch contest data from three programming platforms:

1. **CodeForces**
2. **LeetCode**
3. **CodeChef**

API endpoints are defined in the `API_URLS` object in the frontend:

```javascript
const API_URLS = {
  codeforces: "http://localhost:5000/api/contest/codeforces",
  leetcode: "http://localhost:5000/api/contest/leetcode",
  codechef: "http://localhost:5000/api/contest/codechef",
};
```

## Authentication

The application uses token-based authentication:

1. Users register or login through the Signup/Login pages.
2. On successful authentication, a token is stored in `localStorage`.
3. The token is used in API requests that require authentication (e.g., bookmarking contests).

## Bookmarking System

Users can bookmark contests they are interested in:

1. The bookmark action requires authentication.
2. Bookmarked contests are stored on the server via the API.
3. Bookmarks are also cached locally in `localStorage`.
4. The `BookmarkedContests` page displays all bookmarked contests.

## YouTube Links Integration

The application supports adding YouTube links to contests (likely tutorial videos or editorial discussions):

1. Admin users can access the `AddYoutube` page (protected route).
2. YouTube links can be added to specific contests.
3. When contests are displayed, their YouTube links (if available) are shown alongside other information.

## Web Scraping

The application scrapes data from competitive programming websites using **Cheerio** and **Puppeteer**:

1. **Puppeteer** is used for headless browsing when JavaScript rendering is required.
2. The scraping scripts fetch data from:
   - CodeForces
   - LeetCode
   - CodeChef
3. The extracted data is stored in MongoDB and served through the backend API.

This ensures that users always have up-to-date contest information in the application.


