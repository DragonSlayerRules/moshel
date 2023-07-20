import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import arrowLeft from "../assets/logo/arrowLeft.svg";
import MiniCard from "../components/miniCard";

function Details() {
  const params = useParams();
  const [data, setData] = useState();
  const [link, setLink] = useState();
  const navigate = useNavigate();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNjZjI2NDlhZmUzMmM2NWZhNWMwMGE2NDFlYmYwNyIsInN1YiI6IjY0YWJiOGFhOGEwZTliMDEwMGMzODhkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WzLmOCYKYl4YPdAmlcDMiT1ad-HfU7lAY1iTP4gPpFQ",
    },
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${params.type}/${params.userId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setData((prev) => ({
          ...prev,
          details: response,
        }))
      )
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/${params.type}/${params.userId}/credits?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setData((prev) => ({
          ...prev,
          casts: response,
        }))
      )
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/movie/${params.userId}/recommendations`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setData((prev) => ({
          ...prev,
          recommendations: response,
        }))
      )
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/${params.type}/${params.userId}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setLink(
          response.results.filter((unit) => unit.type === "Trailer")[0].key
        )
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 grid grid-cols-12 gap-2 my:gap-4 my-2 sm:mt-4 sm:mb-40">
        <div className="col-span-full xl:col-span-8">
          <div
            className="p-4 bg-black/80 absolute rounded-tl-2xl rounded-br-2xl cursor-pointer"
            onClick={handleGoBack}
          >
            <div className="hidden xl:block text-white font-2xl font-bold">
              BACK
            </div>
            <img src={arrowLeft} alt="" className="xl:hidden" />
          </div>
          <iframe
            src={`https://www.youtube.com/embed/${link}`}
            className="w-full aspect-video rounded-2xl"
          ></iframe>
          <div className="hidden xl:block mt-2 space-y-2">
            <MiniCard
              data={data?.casts?.cast?.slice(0, 20)}
              type="creditCast"
            />
                <MiniCard
                data={data?.recommendations?.results.slice(0, 20)}
                type="recommend"
              />
          </div>
        </div>
        {data && (
          <div className="col-span-full xl:col-span-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full overflow-clip rounded-2xl p-4 bg-secondary">
              {data?.details?.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${data?.details?.poster_path}`}
                  alt=""
                  className="aspect-[3/4] object-cover h-fit col-span-1 rounded-md"
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-gray-400 font-bold text-2xl flex items-center justify-center">
                  Image Not Found
                </div>
              )}

              <div className="col-span-2 h-fit text-highlight">
                <div className="font-bold text-2xl">{data?.details?.title}</div>
                <div className="text-lg font-light">
                  <span className="font-bold">Genre:</span>{" "}
                  {data?.details?.genres.map((unit) => unit?.name).join(", ")}
                </div>
                <div className="text-lg font-light">
                  <span className="font-bold">Date:</span>{" "}
                  {data?.details?.release_date}
                </div>
                <div className="text-lg font-light">
                  <span className="font-bold">Duration:</span>{" "}
                  {data?.details?.runtime} Minutes
                </div>
                <div className="text-lg font-light">
                  <span className="font-bold">Production Company:</span>{" "}
                  {data?.details?.production_companies
                    .map((unit) => unit?.name)
                    .join(", ")}
                </div>

                <div className="hidden sm:block">
                  {" "}
                  <span className="font-bold">Overview: </span>
                  {data?.details?.overview}
                </div>
              </div>
              <div className="col-span-full text-highlight">
                <div className="sm:hidden">
                  {" "}
                  <span className="font-bold">Overview:</span>{" "}
                  {data?.details?.overview}
                </div>
                <div className="border w-full py-2 text-center rounded-md">
                  Save to favorite
                </div>
              </div>
            </div>
            <div className="xl:hidden mt-2 space-y-2">
              <MiniCard
                data={data?.casts?.cast?.slice(0, 20)}
                type="creditCast"
              />
              <MiniCard
                data={data?.recommendations?.results.slice(0, 20)}
                type="recommend"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Details;
