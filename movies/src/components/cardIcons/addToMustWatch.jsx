import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const AddToMustWatchIcon = ({ movie }) => {
  const { mustWatch, addToMustWatch, removeFromMustWatch } = useContext(MoviesContext);
  const inList = mustWatch.includes(movie.id);

  const handleToggle = (e) => {
    e.preventDefault();
    if (inList) {
      removeFromMustWatch(movie);
    } else {
      addToMustWatch(movie);
    }
  };

  return (
    <Tooltip title={inList ? "Remove from Must Watch" : "Add to Must Watch"}>
      <IconButton
        aria-label={inList ? "remove from must watch" : "add to must watch"}
        onClick={handleToggle}
      >
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