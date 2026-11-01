import TmdbListPage from "./tmdbListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";

const NowPlayingMoviesPage = () => (
  <TmdbListPage title="Now Playing" queryName="nowPlaying" queryFn={getNowPlayingMovies} />
);
export default NowPlayingMoviesPage;