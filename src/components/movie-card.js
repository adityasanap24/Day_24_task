import React from "react";

const MovieCard = ({ movie, selectMovie }) => {
  return (
    <div
      className={"movie-card"}
      id={"card"}
      onClick={() => {
        selectMovie(movie);
        window.scrollTo(0, 0);
      }}
    >
      {movie.poster ? (
        <img className={"movie-cover"} src={`${movie.poster}`} alt="" />
      ) : (
        <div className={"no-image"}>No Image Found</div>
      )}
      <h5 className={"movie-title"}>{movie.name}</h5>
    </div>
  );
};

export default MovieCard;
