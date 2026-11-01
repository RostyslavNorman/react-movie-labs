import React, { useState } from "react";
import usePersistentState from "../hooks/usePersistentState";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = usePersistentState("tmdb.favorites", []);
  const [myReviews, setMyReviews] = usePersistentState("tmdb.reviews", {});
  const [mustWatch, setMustWatch] = usePersistentState("tmdb.mustWatch", []);
  const [favoriteActors, setFavoriteActors] = usePersistentState("tmdb.favoriteActors", []);


  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    }
    else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review })
  };
  

  const addToMustWatch = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      const newMustWatch = [...mustWatch, movie.id];
      setMustWatch(newMustWatch);
    }
  };
  
  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter(
      (mId) => mId !== movie.id
    ))
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch(mustWatch.filter((mId) => mId !== movie.id));
  };

  const addToFavoriteActors = (person) => {
    if (!favoriteActors.includes(person.id)) {
      setFavoriteActors([...favoriteActors, person.id]);
    }
  };

  const removeFromFavoriteActors = (person) => {
    setFavoriteActors(favoriteActors.filter((pId) => pId !== person.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );

};

export default MoviesContextProvider;
