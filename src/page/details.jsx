import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import close from "../assets/logo/close.svg";
// import Content from "../components/content";

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
      `https://api.themoviedb.org/3/movie/${params.userId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/movie/${params.userId}/videos?language=en-US`,
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
          {/* <Link
            to="#"
            className="p-4 bg-black/50 absolute"
            onClick={handleGoBack}
          >
            <div className="hidden xl:block text-white font-2xl font-bold">
              CLOSE
            </div>
            <img src={close} alt="" className="xl:hidden" />
          </Link> */}
          <iframe
            src={`https://www.youtube.com/embed/${link}`}
            className="w-full aspect-video rounded-2xl"
          ></iframe>
        </div>
        {data && (
          <div className="col-span-full xl:col-span-4 grid grid-cols-3 gap-2 sm:gap-4 w-full h-fit overflow-clip rounded-2xl p-4 bg-secondary">
            <img
              src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
              alt=""
              className="aspect-auto h-fit col-span-1"
            />
            <div className="col-span-2 h-fit text-highlight">
              <div className="font-bold text-2xl">{data?.original_title}</div>
              <div className="text-lg font-light">
               <span className="font-bold">Genre:</span> {data?.genres.map((unit) => unit.name).join(", ")}
              </div>
              <div className="text-lg font-light">
               <span className="font-bold">Date:</span> {data?.release_date}
              </div>
              <div className="text-lg font-light">
               <span className="font-bold">Duration:</span> {data?.runtime} Minutes
              </div>

           
              <div className="hidden sm:block"> <span className="font-bold">Overview: </span>{data?.overview}</div>
            </div>
            <div className="col-span-full text-highlight">
            <div className="sm:hidden"> <span className="font-bold">Overview:</span> {data?.overview}</div>

              <div className="border w-full py-2 text-center rounded-md">
                Save to favorite
              </div>
            </div>
          </div>
        )}
      </div>
      {/* {Content("topRated")} */}
    </>
  );
}


export default Details;