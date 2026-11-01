import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { getMovieVideos } from "../../api/tmdb-api";

export default function MovieTrailer({ movie }) {
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["videos", { id: movie.id }],
    queryFn: getMovieVideos,
  });

  const trailer = data?.results.find((v) => v.site === "YouTube" && v.type === "Trailer");
  if (!trailer) return null;

  return (
    <>
      <Button variant="contained" startIcon={<PlayArrowIcon />} onClick={() => setOpen(true)} sx={{ my: 2 }}>
        Watch trailer
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <iframe
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{ border: 0 }}
        />
      </Dialog>
    </>
  );
}