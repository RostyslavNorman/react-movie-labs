import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const AddToMustWatchIcon = ({ movie }) => {
  const { mustWatch, addToMustWatch } = useContext(MoviesContext);
  const inList = mustWatch.includes(movie.id);

  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    addToMustWatch(movie);
  };

  return (
    <Tooltip title={inList ? "In Must Watch" : "Add to Must Watch"}>
      <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
        {inList ? (
          <PlaylistAddCheckIcon color="success" fontSize="large" />
        ) : (
          <PlaylistAddIcon color="primary" fontSize="large" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default AddToMustWatchIcon;