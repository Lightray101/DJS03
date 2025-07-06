import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Filters from "./components/Filters.jsx";
import PodcastGrid from "./components/PodcastGrid.jsx";
import Modal from "./components/Modal.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
// API endpoint for podcast data
const API_URL = "https://podcast-api.netlify.app/";
import "./App.css";

/**
 * Main App component that manages the podcast discovery application
 * @returns {JSX.Element} The main app component
 */
function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("updated-desc");
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Fetch podcast data from external API
   */
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // The API returns an array of podcasts directly
        setPodcasts(data || []);

        // Extract unique genres from podcasts
        const uniqueGenres = [];
        const genreMap = new Map();

        data.forEach((podcast) => {
          if (podcast.genres) {
            podcast.genres.forEach((genreId) => {
              if (!genreMap.has(genreId)) {
                const genre = {
                  id: genreId,
                  name: `Genre ${genreId}`, // We'll use placeholder names since API doesn't provide genre names
                };
                genreMap.set(genreId, genre);
                uniqueGenres.push(genre);
              }
            });
          }
        });

        setGenres(uniqueGenres);

        // Create seasons data from podcasts
        const seasonsData = data.map((podcast) => ({
          id: podcast.id,
          seasonDetails: podcast.seasons
            ? Array.from({ length: podcast.seasons }, (_, i) => ({
                title: `Season ${i + 1}`,
                episodes: Math.floor(Math.random() * 10) + 5, // Random episode count
              }))
            : [],
        }));

        setSeasons(seasonsData);
      } catch (err) {
        console.error("Error fetching podcasts:", err);
        setError(
          "Failed to fetch podcasts from the API. Please check your internet connection and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  /**
   * Handle podcast card click to open modal
   * @param {Object} podcast - The podcast object
   */
  const handlePodcastClick = (podcast) => {
    setSelectedPodcast(podcast);
    setIsModalOpen(true);
  };

  /**
   * Close the modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPodcast(null);
  };

  /**
   * Filter and sort podcasts based on current filters
   * @returns {Array} Filtered and sorted podcasts
   */
  const getFilteredAndSortedPodcasts = () => {
    let filteredPodcasts = [...podcasts];

    // Filter by genre
    if (selectedGenre !== "all") {
      const genreId = parseInt(selectedGenre.replace("genre-", ""));
      filteredPodcasts = filteredPodcasts.filter((podcast) =>
        podcast.genres.includes(genreId)
      );
    }

    // Sort podcasts
    filteredPodcasts.sort((a, b) => {
      switch (sortBy) {
        case "updated-desc":
          return new Date(b.updated) - new Date(a.updated);
        case "popular-desc":
          return b.seasons - a.seasons;
        case "newest-desc":
          return new Date(b.updated) - new Date(a.updated);
        default:
          return 0;
      }
    });

    return filteredPodcasts;
  };

  const filteredPodcasts = getFilteredAndSortedPodcasts();

  if (loading) {
    return (
      <div className="app">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Header />
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Filters
          genres={genres}
          selectedGenre={selectedGenre}
          sortBy={sortBy}
          onGenreChange={setSelectedGenre}
          onSortChange={setSortBy}
        />

        {filteredPodcasts.length === 0 ? (
          <ErrorMessage message="No podcasts found with the selected filters." />
        ) : (
          <PodcastGrid
            podcasts={filteredPodcasts}
            genres={genres}
            onPodcastClick={handlePodcastClick}
          />
        )}
      </main>

      {isModalOpen && selectedPodcast && (
        <Modal
          podcast={selectedPodcast}
          genres={genres}
          seasons={seasons}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
