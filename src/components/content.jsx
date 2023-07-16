import React, { useEffect, useState } from "react";

import movieCard from "./movieCard";
// import {Link} from "react-router-dom";

function Content(param) {
  const [movieData, setMovieData] = useState();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNjZjI2NDlhZmUzMmM2NWZhNWMwMGE2NDFlYmYwNyIsInN1YiI6IjY0YWJiOGFhOGEwZTliMDEwMGMzODhkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WzLmOCYKYl4YPdAmlcDMiT1ad-HfU7lAY1iTP4gPpFQ",
    },
  };

  useEffect(() => {
    param === "popular" &&
      fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((response) => setMovieData(response.results.slice(0, 8)))
        .catch((err) => console.error(err));

    param === "topRated" &&
      fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((response) => setMovieData(response.results.slice(0, 8)))
        .catch((err) => console.error(err));
    param === "upComing" &&
      fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((response) => setMovieData(response.results.slice(0, 8)))
        .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 my-6">
      <div className="text-4xl font-revxSemiBold ">
        {param === "popular"
          ? "Popular"
          : param === "topRated"
          ? "Top Rated"
          : "Up Coming"}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
       {movieCard(movieData)}
      </div>
    </div>
  );
}

export default Content;
