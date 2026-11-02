import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const genreId = Number(genreFilter);

  const sorters = {
    none: () => 0,
    ratingDesc: (a, b) => b.vote_average - a.vote_average,
    ratingAsc: (a, b) => a.vote_average - b.vote_average,
    dateDesc: (a, b) => (b.release_date || "").localeCompare(a.release_date || ""),
    dateAsc: (a, b) => (a.release_date || "").localeCompare(b.release_date || ""),
    titleAsc: (a, b) => a.title.localeCompare(b.title),
  };

  const displayedMovies = movies
    .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true))
    .filter((m) => m.vote_average >= ratingFilter)
    .filter((m) => languageFilter === "all" || m.original_language === languageFilter)
    .sort(sorters[sortBy]);

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "language") setLanguageFilter(value);
    else if (type === "sort") setSortBy(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>

      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
