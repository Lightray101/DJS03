import React from "react";
import "./Filters.css";

/**
 * Filters component for genre and sorting options
 * @param {Object} props - Component props
 * @param {Array} props.genres - Array of genre objects
 * @param {string} props.selectedGenre - Currently selected genre
 * @param {string} props.sortBy - Current sort option
 * @param {Function} props.onGenreChange - Callback for genre change
 * @param {Function} props.onSortChange - Callback for sort change
 * @returns {JSX.Element} The filters component
 */
function Filters({
  genres,
  selectedGenre,
  sortBy,
  onGenreChange,
  onSortChange,
}) {
  return (
    <section className="filters">
      <span className="filters__label">Filter by:</span>
      <div className="filters__dropdown-container">
        <select
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="filters__dropdown"
        >
          <option value="all">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={`genre-${genre.id}`}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filters__dropdown-container">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="filters__dropdown"
        >
          <option value="updated-desc">Recently Updated</option>
          <option value="popular-desc">Most Popular</option>
          <option value="newest-desc">Newest</option>
        </select>
      </div>
    </section>
  );
}

export default Filters;
