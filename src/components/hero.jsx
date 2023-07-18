import React, { useEffect, useState } from "react";
import arrowLeft from "../assets/logo/arrowLeft.svg";
import arrowRight from "../assets/logo/arrowRight.svg";
import dropDown from "../assets/logo/arrowDown.svg";
import { get } from "../service/service";
import { execute } from "../service/funtion";

function Hero() {
  const [movieData, setMovieData] = useState([]);
  const [num, setNum] = useState(0);
  const [slide, setSlide] = useState();
  const [genres, setGenres] = useState();
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    get
      .getGenres()
      .then((results) => {
        setGenres(results);
      })
      .catch((error) => {
        console.error(error);
      });

    get
      .getMovie("nowPlaying")
      .then((results) => {
        setMovieData(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (movieData) {
      setSlide(movieData[num]);
    }
  }, [movieData, num]);

  return (
    <>
      <div className="w-full container mx-auto px-4 grid grid-cols-12 my-2 sm:my-4">
        <div className="col-span-full lg:col-span-8 w-full aspect-[2/1] object-fill relative rounded-2xl h-full sm:overflow-clip">
          <div className="flex items-end flex-col-reverse w-full">
            {slide && (
              <div className="bg-secondary sm:bg-transparent bg-gradient-to-t from-black full sm:absolute z-40 justify-start flex flex-col items-start sm:justify-end w-full gap-2 px-2 py-4 sm:p-4 bottom-0 rounded-b-2xl">
                <div className="grid grid-cols-6 rounded-2xl">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${slide?.poster_path}`}
                    alt=""
                    className="col-span-2 sm:col-span-1 aspect-[3/4] object-cover"
                  />
                  <div className="col-span-4 sm:col-span-5 overflow-hidden h-full pl-2 w-full sm:w-full flex flex-col items-start justify-between relative">
                    <div>
                      <div className="text-xl sm:text-4xl text-highlight font-bold">
                        {slide?.title.length >= 32
                          ? slide?.title.slice(0, 32) + "..."
                          : slide?.title}
                      </div>
                      <div className="text-highlight gap-2 flex">
                        {execute
                          .handleFilter(slide?.genre_ids, genres)
                          .join(", ")}
                      </div>
                    </div>
                    <div
                      className="px-2 sm:p-2 border flex items-center w-fit justify-center text-highlight"
                      onClick={() => (drop ? setDrop(false) : setDrop(true))}
                    >
                      Overview
                      <div
                        className={`${
                          drop ? "rotate-180" : "rotate-0"
                        } duration-500`}
                      >
                        {" "}
                        <img
                          src={dropDown}
                          alt=""
                          className="w-6 aspect-square"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    drop ? "h-40 sm:h-20" : "h-0 "
                  } text-highlight text-base transition-all overflow-y-scroll duration-500 w-full`}
                >
                  {slide?.overview}
                </div>
              </div>
            )}
            <div className="relative w-full">
              <div className="absolute w-full z-40 bottom-0 sm:top-0 h-fit">
                <div className="flex w-full justify-between">
                  <button
                    className="p-4 rounded-tr-2xl sm:rounded-br-2xl sm:p-4 bg-stroke/50 cursor-pointer"
                    onClick={() => {
                      num >= 1 && setNum(num - 1);
                    }}
                  >
                    <img
                      src={arrowLeft}
                      alt=""
                      className="w-8 sm:w-10 aspect-square"
                    />
                  </button>
                  <button
                    className="p-4 rounded-tl-2xl sm:rounded-bl-2xl sm:p-4 bg-stroke/50 cursor-pointer"
                    onClick={() => {
                      num !== 9 && setNum(num + 1);
                    }}
                  >
                    <img
                      src={arrowRight}
                      alt=""
                      className="w-8 sm:w-10 aspect-square"
                    />
                  </button>
                </div>
              </div>
              {/* <div className="w-full h-full bg-gradient-to-t from-secondary via-transparent flex z-40 absolute top-0"></div> */}
              {slide?.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${slide?.backdrop_path}`}
                  alt=""
                  className="object-cover w-full aspect-[2/1] rounded-t-2xl"
                />
              ) : (
                <div className="w-full h-full animate-pulse aspect-[2/1] bg-gray-400"></div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-4 aspect-square pl-4 overflow-clip rounded-2xl w-full hidden lg:block space-y-2">
          {/* <div className="font-bold text-2xl p-4 bg-secondary text-highlight rounded-t-2xl">
            <div>Up Coming Movies</div>
          </div> */}
          <div className="h-full overflow-y-scroll space-y-2 rounded-2xl">
            <div className="font-bold text-2xl p-4 bg-secondary text-highlight rounded-t-2xl sticky top-0">
              <div>Up Coming Movies</div>
            </div>
            {movieData?.map((unit, index) => {
              return (
                <div
                  className="flex items-start gap-2 cursor-pointer bg-secondary p-4"
                  key={unit.id}
                  onClick={() => setNum(index)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${unit.poster_path}`}
                    alt=""
                    className="w-1/5 object-contain"
                  />
                  <div>
                    <div className="font-bold text-lg text-highlight">
                      {unit.title}
                    </div>
                    <div className="text-highlight flex gap-2">
                      {execute.handleFilter(unit.genre_ids, genres).join(", ")}
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
