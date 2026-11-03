import AddToFavoritesIcon from "./addToFavorites";
import AddToMustWatchIcon from "./addToMustWatch";

const DefaultActions = ({ movie }) => (
  <>
    <AddToFavoritesIcon movie={movie} />
    <AddToMustWatchIcon movie={movie} />
  </>
);

export default DefaultActions;