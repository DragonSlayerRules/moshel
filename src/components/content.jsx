import React, { useEffect, useState } from "react";
import { get } from "../services/service";
import MovieCard from "./movieCard";
function Content(param) {
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    get
      .getMovie(param)
      .then((results) => {
        setMovieData(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 my-2 sm:my-4">
      <div className="text-2xl sm:text-4xl font-revxSemiBold ">
        {param === "popular"
          ? "Popular"
          : param === "topRated"
          ? "Top Rated"
          : "Up Coming"}
      </div>
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4"> */}
      <div className="flex overflow-scroll">
        <div className="flex gap-2 sm:gap-4">
          <MovieCard data={movieData} type="movie" location='front' />
        </div>
      </div>
    </div>
  );
}

export default Content;
