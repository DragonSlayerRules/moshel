import React from "react";
import { Link } from "react-router-dom";

function profileCard(data) {
  return (
    <div className="space-y-4 col-span-full">
      {data?.map((unit) => (
        <Link to={`/profile/${unit.id}`} className="flex h-32 w-full">
          {unit.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${unit.profile_path}`}
              alt=""
              className="aspect-[3/4] object-center"
            />
          ) : (
            <div className="aspect-[3/4] bg-gray-400 font-bold text-2xl flex items-center justify-center">
              Image Not Found
            </div>
          )}
          <div className="bg-secondary w-full text-highlight p-4">
            <div className="font-bold text-xl">{unit.name}</div>
            <div className="font-medium text-base">
              {unit.known_for_department}
            </div>
            <div className="font-medium text-base">
              Popularity {unit.popularity.toFixed(1)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default profileCard;
