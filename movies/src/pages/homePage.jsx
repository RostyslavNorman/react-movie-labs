import TmdbListPage from "./tmdbListPage";
import { getMovies } from "../api/tmdb-api";

const HomePage = () => (
  <TmdbListPage title="Discover Movies" queryName="discover" queryFn={getMovies} />
);
export default HomePage;