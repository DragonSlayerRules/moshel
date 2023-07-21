import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../assets/notFound.jpeg";
import { execute } from "../../services/funtion";
import SkeletonCard from "../protons/skeletonCard";

function MiniCard(p) {
  const { data, type } = p;
  return (
    <div
      className={`${
        type === "creditCast" || type === "recommend"
          ? "p-4 rounded-2xl"
          : "p-0"
      } space-y-2 bg-secondary overflow-clip`}
    >
      <div className="text-xl font-bold text-highlight">
        {type === "creditCast"
          ? "Casts"
          : type === "creditMovie"
          ? "Also known as"
          : "Recommedation"}
      </div>

      <div className="flex overflow-scroll">
        <div className="flex gap-2">
          {data ? (type === "creditCast" ? data : execute.handleSortPopular(data))?.map(
            (unit, index) => (
              <Link
                to={
                  type === "creditCast"
                    ? `/profile/${unit.id}`
                    : `/details/movie/${unit.id}`
                }
                key={index}
                className="overflow-clip rounded-md w-40"
              >
                {unit.profile_path || unit.poster_path ? (
                  <div className="aspect-[3/4] bg-gray-500">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${
                        type === "creditCast"
                          ? unit.profile_path
                          : unit.poster_path
                      }`}
                      alt=""
                      className="aspect-[3/4] object-cover h-fit w-40 col-span-1"
                    />
                  </div>
                ) : (
                 <div className="aspect-[3/4] bg-gray-500">
                   <img
                    src={notFound}
                    className="aspect-[3/4] object-cover"
                    alt=""
                  />
                 </div>
                )}

                <div className="bg-white/50 truncate px-2 py-1 font-bold text-lg text-secondary leading-tight">
                  <div className="truncate">
                    {type === "creditCast" ? unit.original_name : unit.title}
                  </div>
                  <div className="font-light truncate">
                    {" "}
                    {type === "creditCast"
                      ? unit.character
                        ? unit.character
                        : "-"
                      : ""}
                  </div>
                </div>
              </Link>
            )
          ) : <SkeletonCard/>}
        </div>
      </div>
    </div>
  );
}

export default MiniCard;
