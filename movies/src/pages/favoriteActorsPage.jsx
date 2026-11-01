import { useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../components/headerMovieList";
import ActorCard from "../components/actorCard";
import Spinner from "../components/spinner";
import { MoviesContext } from "../contexts/moviesContext";
import { getPerson } from "../api/tmdb-api";

const FavoriteActorsPage = () => {
  const { favoriteActors, removeFromFavoriteActors } = useContext(MoviesContext);

  const queries = useQueries({
    queries: favoriteActors.map((id) => ({
      queryKey: ["person", { id: String(id) }],
      queryFn: getPerson,
    })),
  });

  if (queries.some((q) => q.isPending)) return <Spinner />;
  const failed = queries.find((q) => q.isError);
  if (failed) return <h1>{failed.error.message}</h1>;

  const actors = queries.map((q) => q.data);

  return (
    <>
      <Header title="Favourite Actors" />
      {favoriteActors.length === 0 && (
        <Typography sx={{ p: 3 }}>
          No favourite actors yet — open any actor and press "Add to favourite actors".
        </Typography>
      )}
      <Grid container spacing={2} sx={{ p: 2 }}>
        {actors.map((person) => (
          <Grid key={person.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <ActorCard
              person={person}
              subtitle={person.known_for_department}
              action={(p) => (
                <IconButton
                  aria-label="remove from favourite actors"
                  onClick={() => removeFromFavoriteActors(p)}
                >
                  <DeleteIcon color="primary" />
                </IconButton>
              )}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default FavoriteActorsPage;