import React, { useEffect, useState } from "react";
import { get } from "../../services/service";
import MovieCard from "../atoms/movieCard";
function Content({param}) {
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
  }, [param]);

  return (
    <div className="container mx-auto px-4 my-2 sm:my-4 ">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="text-2xl sm:text-4xl font-revxSemiBold ">
            {param === "popular"
              ? "Popular"
              : param === "topRated"
              ? "Top Rated"
              : "Up Coming"}
          </div>
          <div className="rounded-sm flex overflow-clip text-sm text-highlight font-bold">
           <div className="px-4 py-1 bg-secondary">MOVIE</div>
           <div className="h-full w-0.5 bg-highlight"></div>
           <div className="px-4 py-1 bg-secondary">TV</div>
          </div>
        </div>
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4"> */}
      <div className="relative overflow-clip">
        <div className="flex justify-end z-50 w-full h-0">
          <div className="h-[60rem] w-2 z-20 bg-gradient-to-l from-primary absolute"></div>
        </div>
        <div className="flex overflow-scroll w-full snap-x">
          <div className="flex gap-2 sm:gap-4">
            <MovieCard data={movieData} type="movie" location="front" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
