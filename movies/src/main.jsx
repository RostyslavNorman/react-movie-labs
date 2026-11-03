import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import PersonDetailsPage from "./pages/personDetailsPage";
import ScrollToTop from "./components/scrollToTop";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import FavoriteActorsPage from "./pages/favoriteActorsPage";
import SearchMoviesPage from "./pages/searchMoviesPage";
import { useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./theme";
import { ColorModeContext } from "./contexts/colorModeContext";
import usePersistentState from "./hooks/usePersistentState";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  const [mode, setMode] = usePersistentState("tmdb.colorMode", "dark");
  const theme = useMemo(() => getTheme(mode), [mode]);
  const colorMode = useMemo(
    () => ({ mode, toggle: () => setMode((m) => (m === "light" ? "dark" : "light")) }),
    [mode, setMode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <ScrollToTop />
            <SiteHeader />
            <MoviesContextProvider>
              <Routes>
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/movies/popular" element={<PopularMoviesPage />} />
                <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
                <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />
                <Route path="/movies/must-watch" element={<MustWatchMoviesPage />} />
                <Route path="/actors/favorites" element={<FavoriteActorsPage />} />
                <Route path="/person/:id" element={<PersonDetailsPage />} />
                <Route path="/search" element={<SearchMoviesPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MoviesContextProvider>
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);
