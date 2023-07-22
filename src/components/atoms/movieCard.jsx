import React, { useEffect, useState } from "react";
import save from "../../assets/logo/save.svg";
import { useNavigate } from "react-router-dom";
import { execute } from "../../services/funtion";
import { get } from "../../services/service";
import SkeletonPotrait from "../protons/skeletonPotrait";

function MovieCard(p) {
  const { data, type, location } = p;
  const [genres, setGenres] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    get
      .getGenres(type)
      .then((results) => {
        setGenres(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [type]);

  return (
    <>
      {data ? (
        data.map((unit, index) => (
          <div
            onClick={() => navigate(`/details/${type}/${unit.id}`)}
            className={`${
              location === "front" ? "w-40 sm:w-52" : "w-full"
            } snap-start rounded-md overflow-hidden cursor-pointer aspect-[1/2] relative`}
            key={index}
          >
            <div className="aspect-3/4 bg-gray-500">
              <div>
                <div>
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/auth/login}`);
                    }}
                    src={save}
                    alt=""
                    className="absolute w-8 sm:w-12 rounded-tl-md"
                  />
                </div>
                {unit.poster_path ? (
                  <div className="aspect-[3/4] w-full bg-gray-300 ">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${unit.poster_path}`}
                      alt=""
                      className="aspect-[3/4] object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[3/4] bg-gray-400 font-bold text-2xl flex items-center justify-center">
                    Image Not Found
                  </div>
                )}
              </div>
              <div className="aspect-[3/2] w-full h-auto py-3 px-2 sm:p-4 font-light text-base bg-secondary text-highlight flex flex-col justify-between">
                <div>
                  <div className="font-bold text-lg truncate">
                    {unit?.title ? unit?.title : unit?.name}
                  </div>
                  <div className="overflow-hidden text-xs sm:text-base">
                    {execute.handleFilter(unit?.genre_ids, genres).join(", ")}
                  </div>
                </div>
                <div className="underline-offset-1 underline">view details</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <SkeletonPotrait
          width={location === "back" ? "full" : "fit"}
          aspect="1/2"
        />
      )}
    </>
  );
}

export default MovieCard;
