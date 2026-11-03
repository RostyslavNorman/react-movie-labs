import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import TuneIcon from "@mui/icons-material/Tune";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import FilterMoviesDrawer from "../filterMoviesDrawer";
import { defaultFilters, languages, sortOptions } from "../filterMoviesDrawer/options";
import { getGenres } from "../../api/tmdb-api";

const sorters = {
  none: () => 0,
  ratingDesc: (a, b) => b.vote_average - a.vote_average,
  ratingAsc: (a, b) => a.vote_average - b.vote_average,
  dateDesc: (a, b) => (b.release_date || "").localeCompare(a.release_date || ""),
  dateAsc: (a, b) => (a.release_date || "").localeCompare(b.release_date || ""),
  titleAsc: (a, b) => a.title.localeCompare(b.title),
};

function MovieListPageTemplate({ movies, title, action }) {
  const [filters, setFilters] = useState(defaultFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: genreData } = useQuery({ queryKey: ["genres"], queryFn: getGenres });
  const genres = (genreData?.genres ?? []).filter((g) => g.id !== "0");

  const genreId = Number(filters.genre);

  const displayedMovies = movies
    .filter((m) => m.title.toLowerCase().includes(filters.name.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true))
    .filter((m) => m.vote_average >= filters.rating)
    .filter((m) => filters.language === "all" || m.original_language === filters.language)
    .sort(sorters[filters.sort]);

  const handleChange = (type, value) => {
    setFilters((current) => ({ ...current, [type]: value }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  // чипы активных фильтров над списком
  const activeChips = [];
  if (filters.name) activeChips.push({ key: "name", label: `“${filters.name}”` });
  if (genreId > 0) {
    activeChips.push({ key: "genre", label: genres.find((g) => g.id === genreId)?.name ?? "Genre" });
  }
  if (filters.rating > 0) activeChips.push({ key: "rating", label: `Rating ${filters.rating}+` });
  if (filters.language !== "all") {
    activeChips.push({ key: "language", label: languages.find((l) => l.code === filters.language)?.name });
  }
  if (filters.sort !== "none") {
    activeChips.push({ key: "sort", label: `Sort: ${sortOptions.find((s) => s.value === filters.sort)?.label}` });
  }

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>

      <Grid size={12}>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ px: 2.5, pt: 1, pb: 0.5, flexWrap: "wrap", alignItems: "center" }}
        >
          <Badge badgeContent={activeChips.length} color="primary">
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<TuneIcon />}
              onClick={() => setDrawerOpen(true)}
            >
              Filters
            </Button>
          </Badge>

          {activeChips.map((chip) => (
            <Chip
              key={chip.key}
              label={chip.label}
              onDelete={() => handleChange(chip.key, defaultFilters[chip.key])}
            />
          ))}

          {activeChips.length > 0 && (
            <Button size="small" onClick={resetFilters}>
              Clear all
            </Button>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
            Showing {displayedMovies.length} of {movies.length}
          </Typography>
        </Stack>
      </Grid>

      <Grid container size={12}>
        {displayedMovies.length > 0 ? (
          <MovieList action={action} movies={displayedMovies} />
        ) : (
          <Box sx={{ width: "100%", textAlign: "center", py: 8 }}>
            <Typography variant="h6">No movies match these filters</Typography>
            <Button onClick={resetFilters} sx={{ mt: 1 }}>
              Clear filters
            </Button>
          </Box>
        )}
      </Grid>

      <FilterMoviesDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        genres={genres}
        onChange={handleChange}
        onReset={resetFilters}
        resultCount={displayedMovies.length}
      />
    </Grid>
  );
}

export default MovieListPageTemplate;