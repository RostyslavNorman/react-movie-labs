import TmdbListPage from "./tmdbListPage";
import { getPopularMovies } from "../api/tmdb-api";

const PopularMoviesPage = () => (
  <TmdbListPage title="Popular Movies" queryName="popular" queryFn={getPopularMovies} />
);
export default PopularMoviesPage;