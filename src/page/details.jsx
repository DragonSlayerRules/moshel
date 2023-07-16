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
          response.results.filter((unit) => unit.type === "Trailer" )[0].key
        )
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 grid grid-cols-12 gap-4 my-6">
        <div className="col-span-8">
          <Link to="#" className="p-4 bg-black/50 absolute" onClick={handleGoBack}>
            <div className="hidden sm:block text-white font-2xl font-bold">
              CLOSE
            </div>
            <img src={close} alt="" className="sm:hidden" />
          </Link>
          <iframe
            src={`https://www.youtube.com/embed/${link}`}
            className="w-full aspect-video"
          ></iframe>
        </div>
        <div className="col-span-4 grid grid-cols-8 gap-4 h-fit">
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt=""
            className="aspect-auto h-fit col-span-4"
          />
          <div className="col-span-4 h-fit">
            <div className="font-bold text-2xl">{data?.original_title}</div>
            <div>{data?.release_date}</div>
            <div>{data?.runtime} Minutes</div>
          </div>
          <div className="col-span-8">
            <div>{data?.overview}</div>
          </div>
        </div>
      </div>
      {/* {Content("topRated")} */}
    </>
  );
}

export default Details;
