# Podcast Discovery App – React Landing Page
## Overview
- This project is a responsive landing page for a podcast discovery app, built with React. It dynamically displays a grid of podcast previews, fetching data from an external API (https://podcast-api.netlify.app/). The app demonstrates best practices in React component structure, data fetching, state management, and responsive design.

# Features & Requirements Met
## Core Objectives ✅
-  Data Fetching: Fetches podcast data from https://podcast-api.netlify.app/ on initial page load
-  Loading States: Displays a loading spinner while fetching data
-  Error Handling: Shows meaningful error messages if the API fails or returns no results
-  Responsive Grid: Renders podcasts in a responsive grid layout using CSS Grid
-  Modular Components: Uses reusable React components with proper prop passing

# Technical Requirements ✅
-  React Functional Components: All components use modern functional syntax with hooks
-  Fetch API: Uses native fetch() for API calls
-  useEffect(): Fetches data once on component mount
-  useState(): Manages podcast data, loading states, and UI state
-  .map(): Dynamically renders podcast cards from API data
-  Date Formatting: Formats dates using custom formatter (e.g., "2 days ago")

# Responsive Design ✅
-  Desktop (≥1200px): Multi-column grid layout
-  Tablet (~768px): Adaptive grid with medium columns
-  Mobile (~375px): Single-column layout optimized for touch

# CSS Grid/Flexbox: Uses CSS Grid for layout with Flexbox for component alignment
-  Media Queries: Responsive breakpoints for smooth transitions
-  Project Structure
-  Apply to scripts.js

# Key Features
## 1. Live API Integration
-  Fetches real-time podcast data from external API
-  Handles API response structure dynamically
-  Extracts genres and seasons from podcast data
-  Graceful error handling for network issues

## 2. Responsive Podcast Grid
-  Desktop: 4-5 columns with large cards
-  Tablet: 2-3 columns with medium cards
-  Mobile: Single column with full-width cards
-  Smooth transitions between breakpoints

## 3. Interactive Components
-  Genre Filtering: Filter podcasts by genre
-  Sort Options: Sort by date, popularity, or newest
-  Modal Details: Click cards to view detailed information
-  Season Information: Display available seasons in modals

## 4. Professional UI/UX
-  Loading States: Animated spinner during data fetch
-  Error Handling: Clear error messages with retry guidance
-  Empty States: Helpful messages when no podcasts match filters
-  Accessibility: Proper ARIA labels and keyboard navigation
Installation & Setup
-  Clone/Download the project
-  Open in browser
-  Navigate to http://localhost:3000/ (or the port shown in terminal)
-  The app will automatically fetch podcast data from the API
## Available Scripts
-  npm run dev - Start development server with hot reload
-  npm run build - Build for production
-  npm run preview - Preview production build locally
  
# Code Review Checklist
-  ✅ React functional components used
-  ✅ Fetch API implemented correctly
-  ✅ useEffect for data fetching on mount
-  ✅ useState for state management
-  ✅ .map() for dynamic rendering
-  ✅ Date formatting implemented
-  ✅ Responsive CSS Grid/Flexbox
-  ✅ JSDoc comments present
-  ✅ Clean, modular code structure
