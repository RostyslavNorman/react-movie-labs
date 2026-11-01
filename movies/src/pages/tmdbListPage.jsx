import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TmdbListPage = ({ title, queryName, queryFn }) => {
  const page = 1; 
  const { data, error, isPending, isError } = useQuery({
    queryKey: [queryName, { page }],
    queryFn,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <PageTemplate
      title={title}
      movies={data.results}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};
export default TmdbListPage;