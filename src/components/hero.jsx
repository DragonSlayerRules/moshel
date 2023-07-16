import React, { useEffect, useState } from "react";
import arrowLeft from "../assets/logo/arrowLeft.svg";
import arrowRight from "../assets/logo/arrowRight.svg";

function Hero() {
  const [movieData, setMovieData] = useState([]);
  const [num, setNum] = useState(0);
  const [slide, setSlide] = useState();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNjZjI2NDlhZmUzMmM2NWZhNWMwMGE2NDFlYmYwNyIsInN1YiI6IjY0YWJiOGFhOGEwZTliMDEwMGMzODhkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WzLmOCYKYl4YPdAmlcDMiT1ad-HfU7lAY1iTP4gPpFQ",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setMovieData(response.results.slice(0, 10)))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (movieData) {
      setSlide(movieData[num]);
    }
  }, [movieData, num]);

  return (
    <>
      <div className="w-full  mx-auto  grid grid-cols-12 gap-4">
        <div className="col-span-full w-full aspect-[2/1] object-fill relative">
          <div className="absolute w-full z-50">
            <div className="flex w-full justify-between">
              <button
                className="p-2 sm:p-4 bg-stroke/50 cursor-pointer pl-4"
                onClick={() => {
                  num >= 1 && setNum(num - 1);
                }}
              >
                <img
                  src={arrowLeft}
                  alt=""
                  className="w-5 sm:w-10 aspect-square"
                />
              </button>
              <button
                className="p-2 sm:p-4 bg-stroke/50 cursor-pointer pr-4"
                onClick={() => {
                  num !== 9 && setNum(num + 1);
                }}
              >
                <img
                  src={arrowRight}
                  alt=""
                  className="w-5 sm:w-10 aspect-square"
                />
              </button>
            </div>
          </div>
          <div className="flex items-end flex-col-reverse w-full">
            <div className=" bg-secondary/20 h-full absolute z-50 flex justify-start items-end w-full gap-2 p-4 bottom-0 -translate-y-0 sm:-translate-y-0">
              <img
                src={`https://image.tmdb.org/t/p/w500/${slide?.poster_path}`}
                alt=""
                className="aspect-auto w-1/3 sm:w-2/12"
              />
              <div className="w-2/3 sm:w-9/12 flex flex-col items-start border border-red-300 relative">
                <div className="text-xl sm:text-4xl text-highlight truncate font-bold">
                  {slide?.title}
                </div>
                <div className="sm:text-highlight text-base">
                  {slide?.overview.length >= 200
                    ? slide?.overview.slice(0, 200) + "..."
                    : slide?.overview}
                </div>
              </div>
            </div>
            <div className="relative w-full">
              <div className="w-full h-full bg-gradient-to-t from-secondary via-transparent via-10% flex z-40 absolute top-0"></div>
              {slide?.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${slide?.backdrop_path}`}
                  alt=""
                  className="object-cover w-full brightness-50 aspect-square sm:aspect-[2/1]"
                />
              ) : (
                <div className="w-full h-full animate-pulse bg-gray-400"></div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-3 hidden ">
          <div className="font-revxSemiBold text-2xl">Up Coming Movies</div>
          <div className="h-96 overflow-scroll space-y-2">
            {movieData?.map((unit, index) => {
              return (
                <div
                  className="flex items-start gap-2 cursor-pointer h-52"
                  key={unit.id}
                  onClick={() => setNum(index)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${unit.poster_path}`}
                    alt=""
                    className="w-1/4 object-contain"
                  />
                  <div>
                    <div className="font-bold text-lg">{unit.title}</div>
                    <div className="font-light text-base">
                      {unit?.overview.length >= 100
                        ? unit?.overview.slice(0, 100) + "..."
                        : unit?.overview}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
