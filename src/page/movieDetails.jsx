import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import arrowLeft from "../assets/logo/arrowLeft.svg";
import MiniCard from "../components/atoms/miniCard";
import { get } from "../services/service";
import { execute } from "../services/funtion";

function MovieDetails() {
  const params = useParams();
  const [data, setData] = useState();
  const [link, setLink] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    get
      .getMovieDetails(params, "details")
      .then((results) => {
        setData((prev) => ({
          ...prev,
          details: results,
        }));
      })
      .catch((error) => {
        console.error(error);
      });

    get
      .getMovieDetails(params, "casts")
      .then((results) => {
        setData((prev) => ({
          ...prev,
          casts: results,
        }));
      })
      .catch((error) => {
        console.error(error);
      });

    get
      .getMovieDetails(params, "recommendations")
      .then((results) => {
        setData((prev) => ({
          ...prev,
          recommendations: results,
        }));
      })
      .catch((error) => {
        console.error(error);
      });

    get
      .getMovieDetails(params, "link")
      .then((results) => {
        setLink(
          results.results.filter((unit) => unit.type === "Trailer")[0].key
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params]);

  console.log(data);
  return (
    <>
      <div className="container mx-auto px-4 grid grid-cols-12 gap-2 my:gap-4 my-2 sm:mt-4 sm:mb-40">
        <div className="col-span-full xl:col-span-8">
          <div
            className="p-4 bg-black/80 absolute rounded-tl-md rounded-br-md cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <div className="hidden xl:block text-white font-2xl font-bold">
              BACK
            </div>
            <img src={arrowLeft} alt="" className="xl:hidden" />
          </div>
       <div className="aspect-video bg-gray-300 rounded-md overflow-clip">
       {link ? (
            <iframe
              src={`https://www.youtube.com/embed/${link}`}
              className="w-full aspect-video"
              title={data?.details?.title}
            ></iframe>
          ) : data?.details?.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${data?.details?.backdrop_path}`}
              alt=""
              className="aspect-video object-cover h-full"
            />
          ) : (
            <div className="aspect-video bg-gray-300 w-full h-full flex justify-center items-center font-bold text-secondary">
              Image not Found
            </div>
          )}
       </div>
          <div className="hidden xl:block mt-2 space-y-2">
            {data?.casts?.cast?.length !== 0 && (
              <MiniCard
                data={data?.casts?.cast?.slice(0, 20)}
                type="creditCast"
                onClick={execute.handleScrollToTop()}
              />
            )}
            {data?.recommendations?.results?.length !== 0 && (
              <MiniCard
                data={data?.recommendations?.results.slice(0, 20)}
                type="recommend"
                onClick={execute.handleScrollToTop()}
              />
            )}
          </div>
        </div>
        {data && (
          <div className="col-span-full xl:col-span-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full overflow-clip rounded-md p-4 bg-secondary">
              {data?.details?.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${data?.details?.poster_path}`}
                  alt=""
                  className="aspect-[3/4] object-cover h-fit col-span-1 rounded-md"
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-gray-400 font-bold text-2xl flex items-center justify-center rounded-md">
                  Image Not Found
                </div>
              )}

              <div className="col-span-2 h-fit text-highlight">
                <div className="font-bold text-base sm:text-2xl">{data?.details?.title}</div>
                <div className="text-sm sm:text-lg font-light">
                  <span className="font-bold">Genre:</span>{" "}
                  {data?.details?.genres.map((unit) => unit?.name).join(", ")}
                </div>
                <div className="text-sm sm:text-lg font-light">
                  <span className="font-bold">Date:</span>{" "}
                  {data?.details?.release_date}
                </div>
                <div className="text-sm sm:text-lg font-light">
                  <span className="font-bold">Duration:</span>{" "}
                  {data?.details?.runtime} Minutes
                </div>
                <div className="text-sm sm:text-lg font-light">
                  <span className="font-bold">Production Company:</span>{" "}
                  {data?.details?.production_companies
                    .map((unit) => unit?.name)
                    .join(", ")}
                </div>

                {data?.details?.overview && (
                  <div className="text-sm sm:text-lg hidden sm:block">
                    <span className="font-bold">Overview: </span>
                    {data?.details?.overview}
                  </div>
                )}
              </div>
              <div className="col-span-full text-highlight">
                {data?.details?.overview && (
                  <div className="text-sm sm:text-lg sm:hidden">
                    <span className="font-bold">Overview:</span>{" "}
                    {data?.details?.overview}
                  </div>
                )}
                <div className="border w-full py-2 text-center rounded-sm mt-2">
                  Save to favorite
                </div>
              </div>
            </div>
            <div className="xl:hidden mt-2 space-y-2">
              {data?.casts?.cast?.length !== 0 && (
                <MiniCard
                  data={data?.casts?.cast?.slice(0, 20)}
                  type="creditCast"
                  onClick={execute.handleScrollToTop()}
                />
              )}
              {data?.recommendations?.results?.length !== 0 && (
                <MiniCard
                  data={data?.recommendations?.results.slice(0, 20)}
                  type="recommend"
                  onClick={execute.handleScrollToTop()}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MovieDetails;
