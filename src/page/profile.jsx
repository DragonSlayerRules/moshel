import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import instagram from "../assets/logo/instagram.svg";
import twitter from "../assets/logo/twitter.svg";
import tiktok from "../assets/logo/tiktok.svg";
import arrowLeft from "../assets/logo/arrowLeft.svg";
import MiniCard from "../components/miniCard";

function Profile() {
  const params = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();


  const calculateAge = (birthDate) => {
    const ageDiff = Date.now() - new Date(birthDate);
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNjZjI2NDlhZmUzMmM2NWZhNWMwMGE2NDFlYmYwNyIsInN1YiI6IjY0YWJiOGFhOGEwZTliMDEwMGMzODhkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WzLmOCYKYl4YPdAmlcDMiT1ad-HfU7lAY1iTP4gPpFQ",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/person/${params.userId}/movie_credits`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setData((prev) => ({
          ...prev,
          credits: response,
        }))
      )
      .catch((err) => console.error(err));
    fetch(
      `https://api.themoviedb.org/3/person/${params.userId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setData((prev) => ({
          ...prev,
          person: response,
        }))
      )
      .catch((err) => console.error(err));
    fetch(
      `https://api.themoviedb.org/3/person/${params.userId}/external_ids`,
      options
    )
      .then((response) => response.json())
      .then((response) =>
        setData((prev) => ({
          ...prev,
          link: response,
        }))
      )
      .catch((err) => console.error(err));
  }, [params.userId]);

  return (
    <div className="container mx-auto my-2 sm:my-4 gap-4 px-4">
      <div className="grid grid-cols-12 bg-secondary rounded-2xl overflow-clip gap-4 p-4">
        <div className="col-span-full sm:col-span-4 ">
          <div
            className="p-4 bg-black/80 absolute rounded-tl-md rounded-br-md cursor-pointer"
            onClick={handleGoBack}
          >
            <div className="hidden xl:block text-white font-2xl font-bold">
              BACK
            </div>
            <img src={arrowLeft} alt="" className="xl:hidden" />
          </div>
          {data?.person?.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${data?.person?.profile_path}`}
              alt=""
              className="w-1/2 sm:w-full mx-auto aspect-square sm:aspect-[3/4] object-cover rounded-md"
            />
          ) : (
            <div className="aspect-[3/4] bg-gray-400 font-bold text-2xl flex items-center text-center">
              Image Not Found
            </div>
          )}
          <div className=" flex flex-col gap-4 sm:flex-col-reverse  mt-2">
            <div className="">
              <div className="font-bold text-2xl sm:hidden text-highlight text-center sm:text-start">
                {data?.person?.name}
              </div>
              <div className="flex gap-4 mx-auto sm:mx-0 w-fit">
                <a
                  href={`https://www.instagram.com/${data?.link?.instagram_id}/?hl=id`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={instagram} alt="" className="w-8 aspect-square" />
                </a>
                <a
                  href={`https://twitter.com/${data?.link?.twitter_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={twitter} alt="" className="w-8 aspect-square" />
                </a>
                <a
                  href={`https://www.tiktok.com/@${data?.link?.tiktok_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={tiktok} alt="" className="w-8 aspect-square" />
                </a>
              </div>
            </div>
            <div className="text-center sm:text-start">
              <div className="font-bold text-2xl text-highlight border-b border-highlight mb-1">
                Personal Info
              </div>
              <div className="text-highlight text-base">
                <span className="font-bold">Birthday: </span>
                {data?.person?.known_for_department} (
                {calculateAge(data?.person?.birthday)})
              </div>
              <div className="text-highlight">
                <span className="font-bold">Birthday: </span>
                {data?.person?.birthday} ({calculateAge(data?.person?.birthday)}
                )
              </div>
              <div className="text-highlight">
                <span className="font-bold">Place of Birth: </span>
                {data?.person?.place_of_birth}
              </div>
              <div className="text-highlight">
                <span className="font-bold">Deathday: </span>
                {data?.person?.deathday ? data?.person?.deathday : "-"}{" "}
                {data?.person?.deathday
                  ? calculateAge(data?.person?.deathday)
                  : ""}
              </div>
              <div className="text-highlight">
                <span className="font-bold">Gender: </span>
                {data?.person?.gender === 1 ? "Female" : "Male"}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full sm:col-span-8 text-highlight  ">
          <div className="font-bold text-4xl hidden sm:block text-center sm:text-start">
            {data?.person?.name}
          </div>
          <div className="flex flex-col gap-2">
            <div className="">
              <div className="text-xl font-bold ">Biography</div>
              <div className="h-40 overflow-auto">
                {data?.person?.biography ? data?.person?.biography : "-"}
              </div>
            </div>
            <div className="">
              <MiniCard
                data={data?.credits?.cast?.slice(0, 20)}
                type="creditMovie"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
