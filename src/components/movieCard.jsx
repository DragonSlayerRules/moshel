import React, { useEffect, useState } from "react";
import save from "../assets/logo/save.svg";
import { Link } from "react-router-dom";
import { execute } from "../service/funtion";
import { get } from "../service/service";

function MovieCard({ data }) {
  const [genres, setGenres] = useState();
  useEffect(() => {
    get
      .getGenres()
      .then((results) => {
        setGenres(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {data
        ? data.map((unit, index) => (
            <Link
              to={`/details/${unit.id}`}
              className="cardWidth rounded-2xl overflow-hidden cursor-pointer aspect-[3/6]"
              key={index}
            >
              <div>
                <div>
                  <img
                    src={save}
                    alt=""
                    className="absolute w-8 sm:w-12 rounded-tl-2xl"
                  />
                </div>
                {unit.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${unit.poster_path}`}
                    alt=""
                    className="aspect-[3/4] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-gray-400 font-bold text-2xl flex items-center justify-center">
                    Image Not Found
                  </div>
                )}
              </div>
              <div className="aspect-[3/2] w-full h-auto p-2 sm:p-4 font-light text-base bg-secondary text-highlight flex flex-col justify-between">
                <div>
                  <div className="font-bold text-lg truncate">{unit.title}</div>
                  <div className="overflow-hidden">
                    {execute.handleFilter(unit?.genre_ids, genres).join(", ")}
                  </div>
                </div>
                <div className="underline-offset-1 underline">view details</div>
              </div>
            </Link>
          ))
        : [1, 2, 3, 4, 5, 6].map((unit) => (
            <div
              className="w-full aspect-[3/6] animate-pulse bg-gray-400"
              key={unit}
            ></div>
          ))}
    </>
  );
}

export default MovieCard;
