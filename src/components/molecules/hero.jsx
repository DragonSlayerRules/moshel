import React, { useEffect, useState } from "react";
import arrowLeft from "../../assets/logo/arrowLeft.svg";
import arrowRight from "../../assets/logo/arrowRight.svg";
import dropDown from "../../assets/logo/arrowDown.svg";
import { get } from "../../services/service";
import { execute } from "../../services/funtion";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [movieData, setMovieData] = useState([]);
  const [num, setNum] = useState(0);
  const [slide, setSlide] = useState();
  const [genres, setGenres] = useState();
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    get
      .getGenres("movie")
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
        <div
          className="col-span-full lg:col-span-8 w-full aspect-[2/1] object-fill relative rounded-md sm:rounded-2xl h-full sm:overflow-clip"
          onClick={() => navigate(`/details/movie/${slide?.id}`)}
        >
          <div className="flex items-end flex-col-reverse w-full">
            {slide && (
              <div className="bg-secondary sm:bg-transparent bg-gradient-to-t sm:from-black h-full full sm:absolute z-40 justify-start flex flex-col items-start sm:justify-end w-full gap-2 px-2 py-4 sm:p-4 bottom-0 rounded-b-md sm:rounded-b-2xl">
                <div className="grid grid-cols-6 rounded-md sm:rounded-2xl">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${slide?.poster_path}`}
                    alt=""
                    className="col-span-2 sm:col-span-1 aspect-[3/4] object-cover rounded-md"
                  />
                  <div className="col-span-4 sm:col-span-5 overflow-hidden h-full pl-2 w-full sm:w-full flex flex-col items-start sm:justify-end space-y-2 relative">
                    <div>
                      <div className="text-xl sm:text-4xl text-white/80 font-bold">
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
                      className="px-2 sm:p-2 border border-highlight flex items-center w-fit justify-center text-highlight z-50 rounded-md"
                      onClick={(e) => {
                        drop ? setDrop(false) : setDrop(true);
                        e.stopPropagation();
                      }}
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
                <div className="flex w-full justify-between items-end">
                  <button
                    className="p-4 rounded-tr-md sm:rounded-br-2xl sm:rounded-tr-none sm:p-4 bg-stroke/50 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      num >= 1 && setNum(num - 1);
                    }}
                  >
                    <img
                      src={arrowLeft}
                      alt=""
                      className="w-8 sm:w-10 aspect-square"
                    />
                  </button>
                  <div className="font-bold text-xs text-highlight bg-black/50 px-4 py-1 rounded-t-md sm:hidden">
                    Now Playing
                  </div>
                  <button
                    className="p-4 rounded-tl-md sm:rounded-bl-2xl sm:rounded-tl-none sm:p-4 bg-stroke/50 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
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
                  className="object-cover w-full aspect-[2/1] rounded-t-md sm:rounded-t-2xl"
                />
              ) : (
                <div className="w-full h-full animate-pulse aspect-[2/1] bg-gray-400"></div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-4 aspect-square pl-4 overflow-clip rounded-md sm:rounded-2xl w-full hidden lg:block space-y-2">
          <div className="h-full overflow-y-scroll space-y-2 rounded-md sm:rounded-2xl">
            <div className="font-bold text-2xl p-4 z-10 bg-secondary text-highlight rounded-t-2xl rounded-b-md sticky top-0">
              <div>Now Playing</div>
            </div>
            {movieData?.map((unit, index) => {
              return (
                <div
                  className=" flex items-start gap-2 cursor-pointer bg-secondary p-4 rounded-md"
                  key={unit.id}
                  onClick={() => setNum(index)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${unit.poster_path}`}
                    alt=""
                    className="w-1/5 object-cover rounded-md"
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
