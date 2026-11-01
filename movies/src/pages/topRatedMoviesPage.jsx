import TmdbListPage from "./tmdbListPage";
import { getTopRatedMovies } from "../api/tmdb-api";

const TopRatedMoviesPage = () => (
  <TmdbListPage title="Top Rated Movies" queryName="topRated" queryFn={getTopRatedMovies} />
);
export default TopRatedMoviesPage;