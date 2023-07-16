import React from "react";
import save from "../assets/logo/save.svg";
import { Link } from "react-router-dom";

function movieCard(data) {
  return (
    <>
      {data
        ? data?.map((unit, index) => (
            <Link
              to={`/details/${unit.id}`}
              className="w-full rounded-md rounded-tl-none overflow-clip cursor-pointer"
              key={index}
            >
              <div>
                <div>
                  <img src={save} alt="" className="absolute w-12" />
                </div>
                {unit.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${unit.poster_path}`}
                    alt=""
                    className="aspect-[3/4] object-center"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-gray-400 font-bold text-2xl flex items-center justify-center">
                    Image Not Found
                  </div>
                )}
              </div>
              <div className="aspect-[3/1] w-full h-auto p-4 font-light text-base bg-stroke text-highlight">
                <div className="font-bold text-lg truncate">{unit.title}</div>

                <div className="overflow-hidden">
                  {unit?.overview.length >= 50
                    ? unit?.overview.slice(0, 50) + "..."
                    : unit?.overview}
                </div>
                <div className="underline-offset-1 underline">view details</div>
              </div>
            </Link>
          ))
        : [1, 2, 3, 4, 5, 6].map((unit) => (
            <div
              className="w-full aspect-[3/4] animate-pulse bg-gray-400"
              key={unit}
            ></div>
          ))}
    </>
  );
}

export default movieCard;
