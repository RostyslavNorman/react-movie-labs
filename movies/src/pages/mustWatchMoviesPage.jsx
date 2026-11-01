import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage = () => {
  const { mustWatch } = useContext(MoviesContext);
const queries = useQueries({
  queries: mustWatch.map((id) => ({
    queryKey: ["movie", { id: String(id) }],
    queryFn: getMovie,
  })),
});

if (queries.some((q) => q.isPending)) return <Spinner />;

const movies = queries.map((q) => ({
  ...q.data,
  genre_ids: q.data.genres.map((g) => g.id),
}));

return (
  <PageTemplate
    title="Must Watch"
    movies={movies}
    action={(movie) => <RemoveFromMustWatchIcon movie={movie} />}
  />
);
};

export default MustWatchMoviesPage;
