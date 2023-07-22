import React from "react";
import play from "../../assets/logo/play.svg"
import { Link } from "react-router-dom";
import SkeletonLandscape from "../protons/skeletonLandscape";

function TrendingCard({ data }) {
  return (
    <>
      {data ? data?.map((unit) => (
        <Link  to={`/details/${unit.media_type}/${unit.id}`} className="rounded-md overflow-clip w-60 sm:w-80 snap-start">
          <div className="aspect-video w-full bg-gray-500 relative">
            <div className="w-full h-full absolute opacity-0 hover:bg-black/30 hover:opacity-100 duration-700 flex items-center justify-center z-10 cursor-pointer">
             <img src={play} alt="" className="w-10 aspect-square"/>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${unit.backdrop_path}`}
              alt=""
              className="aspect-video w-full object-cover"
            />
          </div>
          <div className="truncate bg-secondary text-highlight flex justify-between">
            <div className="w-3/4 truncate px-4 pt-2 pb-3 font-bold">
              {unit.media_type === "movie" ? unit.title : unit.name}
            </div>
            <div className="bg-gray-700 w-1/4 pt-2 pb-3 font-bold text-center text-highlight">OPEN</div>
          </div>
        </Link>
      )) : <SkeletonLandscape width='fit'/>}
    </>
  );
}

export default TrendingCard;
