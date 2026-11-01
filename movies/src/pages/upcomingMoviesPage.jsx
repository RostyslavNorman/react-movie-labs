import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const UpcomingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={data.results}
      action={(movie) => <AddToMustWatchIcon movie={movie} />}
    />
  );
};
export default UpcomingMoviesPage;