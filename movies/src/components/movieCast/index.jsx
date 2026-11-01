import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import ActorCard from "../actorCard";

export default function MovieCast({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const cast = data.cast.slice(0, 12);

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 1 }}>
        Cast
      </Typography>
      <Grid container spacing={2}>
        {cast.map((person) => (
          <Grid key={person.credit_id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <ActorCard person={person} subtitle={person.character} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}