import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieList from "../components/movieList";
import DefaultActions from "../components/cardIcons/defaultActions"
import img from "../images/film-poster-placeholder.png";
import { useContext } from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoviesContext } from "../contexts/moviesContext";

const PersonDetailsPage = () => {
  const { id } = useParams();
  const personQuery = useQuery({ queryKey: ["person", { id }], queryFn: getPerson });
  const creditsQuery = useQuery({ queryKey: ["personCredits", { id }], queryFn: getPersonMovieCredits });
  const { favoriteActors, addToFavoriteActors } = useContext(MoviesContext);
  

  if (personQuery.isPending || creditsQuery.isPending) return <Spinner />;
  if (personQuery.isError) return <h1>{personQuery.error.message}</h1>;
  if (creditsQuery.isError) return <h1>{creditsQuery.error.message}</h1>;

  const person = personQuery.data;
  const isFav = favoriteActors.includes(person.id);
  const movies = [...new Map(creditsQuery.data.cast.map((m) => [m.id, m])).values()]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 24);

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      <Grid size={{ xs: 12, md: 3 }}>
        <img
          src={person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : img}
          alt={person.name}
          style={{ width: "100%", borderRadius: 8 }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <Typography variant="h3" component="h1">{person.name}</Typography>
        <Button
          variant={isFav ? "contained" : "outlined"}
          startIcon={<FavoriteIcon />}
          disabled={isFav}
          onClick={() => addToFavoriteActors(person)}
          sx={{ my: 1 }}
        >
          {isFav ? "In favourite actors" : "Add to favourite actors"}
        </Button>
        <Paper component="ul" sx={{ display: "flex", flexWrap: "wrap", gap: 1, listStyle: "none", p: 1 }}>
          <li><Chip label={person.known_for_department} color="primary" /></li>
          {person.birthday && <li><Chip label={`Born: ${person.birthday}`} /></li>}
          {person.place_of_birth && <li><Chip label={person.place_of_birth} /></li>}
        </Paper>
        <Typography variant="body1" sx={{ mt: 2, whiteSpace: "pre-line" }}>
          {person.biography || "No biography available."}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant="h4" component="h2">Known for</Typography>
      </Grid>
      <Grid container size={12}>
        <MovieList movies={movies} action={(movie) => <DefaultActions movie={movie} />} />
      </Grid>
    </Grid>
  );
};
export default PersonDetailsPage;