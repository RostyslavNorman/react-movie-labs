import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Header from "../components/headerMovieList";
import MovieList from "../components/movieList";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { searchMovies } from "../api/tmdb-api";

const SearchMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [input, setInput] = useState(query);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchParams(input ? { q: input } : {}, { replace: true });
    }, 400);
    return () => clearTimeout(t);
  }, [input, setSearchParams]);

  const { data, error, isFetching, isError } = useQuery({
    queryKey: ["search", { query, page: 1 }],
    queryFn: searchMovies,
    enabled: query.trim().length > 1,
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <Header title="Search Movies" />
      <Box sx={{ px: 3, py: 2 }}>
        <TextField
          fullWidth
          autoFocus
          label="Search TMDB by title"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Box>
      {isFetching && <Spinner />}
      {isError && <h1>{error.message}</h1>}
      {data && query && (
        <>
          <Typography sx={{ px: 3 }}>{data.total_results} results for “{query}”</Typography>
          <Grid container>
            <MovieList movies={data.results} action={(m) => <AddToFavoritesIcon movie={m} />} />
          </Grid>
        </>
      )}
    </>
  );
};
export default SearchMoviesPage;