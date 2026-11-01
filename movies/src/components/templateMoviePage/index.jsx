import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MovieHeader from "../headerMovie";
import MovieTrailer from "../movieTrailer";
import img from "../../images/film-poster-placeholder.png";

const TemplateMoviePage = ({ movie, children }) => {
  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={5} sx={{ p: 2 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box sx={{ position: { md: "sticky" }, top: 80 }}>
            <Box
              component="img"
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : img}
              alt={movie.title}
              sx={{ width: "100%", display: "block", borderRadius: 2 }}
            />
            <MovieTrailer movie={movie} />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;