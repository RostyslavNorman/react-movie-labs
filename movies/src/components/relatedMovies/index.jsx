import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MovieList from "../movieList";
import Spinner from "../spinner";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";

export default function RelatedMovies({ movie, title, queryName, queryFn }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: [queryName, { id: movie.id }],
    queryFn,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;
  if (data.results.length === 0) return null;

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ mt: 3 }}>{title}</Typography>
      <Grid container>
        <MovieList
          movies={data.results.slice(0, 6)}
          action={(m) => <AddToFavoritesIcon movie={m} />}
        />
      </Grid>
    </>
  );
}