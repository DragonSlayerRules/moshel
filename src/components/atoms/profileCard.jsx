import React from "react";
import { Link } from "react-router-dom";
import SkeletonLandscape from "../protons/skeletonLandscape";

function ProfileCard({ data }) {
  return (
    <>
      {data ? (
        data?.map((unit, index) => (
          <Link
            to={`/profile/${unit.id}`}
            key={index}
            className="flex h-32 w-full rounded-2xl overflow-clip"
          >
            {unit.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${unit.profile_path}`}
                alt=""
                className="aspect-[3/4] object-cover"
              />
            ) : (
              <div className="aspect-[3/4] bg-gray-400 font-bold text-xl flex items-center text-center">
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
        ))
      ) : (
        <SkeletonLandscape width='full'/>
      )}
    </>
  );
}

export default ProfileCard;
