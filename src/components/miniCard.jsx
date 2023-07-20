import React from "react";
import { Link } from "react-router-dom";
import notFound from "../assets/notFound.jpeg";

function MiniCard(p) {
    const sortPopular = (data) => {
        return data?.sort((a, b) => b.popularity - a.popularity);
      };
  const { data, type } = p;
  return (
    <div className={`${type === 'creditCast' || type === 'recommend' ? 'p-4' :  'p-0'} space-y-2 bg-secondary rounded-2xl overflow-clip`}>
      <div className="text-xl font-bold   text-highlight">
        {type === "creditCast" ? "Casts" : type === 'creditMovie' ? "Also known as" : 'Recommedation'}
      </div>

      <div className="flex overflow-scroll">
        <div className="flex gap-2">
          {(type === 'creditCast' ? data : sortPopular(data) )?.map((unit) => (
            <Link
              to={
                type === "creditCast"
                  ? `/profile/${unit.id}`
                  : `/details/movie/${unit.id}`
              }
              className="overflow-clip rounded-md w-40"
            >
              {unit.profile_path || unit.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${
                    type === "creditCast" ? unit.profile_path : unit.poster_path
                  }`}
                  alt=""
                  className="aspect-[3/4] object-cover h-fit w-40 col-span-1"
                />
              ) : (
                <img
                  src={notFound}
                  className="aspect-[3/4] object-cover"
                  alt=""
                />
              )}

              <div className="bg-white/50 truncate px-2 font-bold text-lg text-secondary leading-tight">
                <div className="truncate">
                  {type === "creditCast" ? unit.original_name : unit.title}
                </div>
                <div className="font-light truncate">
                  {" "}
                  {type === "creditCast" ? unit.character : ""}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MiniCard;
