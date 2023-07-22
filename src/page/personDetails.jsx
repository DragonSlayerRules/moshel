import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instagram from "../assets/logo/instagram.svg";
import twitter from "../assets/logo/twitter.svg";
import tiktok from "../assets/logo/tiktok.svg";
import arrowLeft from "../assets/logo/arrowLeft.svg";
import MiniCard from "../components/atoms/miniCard";
import { get } from "../services/service";
import { execute } from "../services/funtion";

function PersonDetails() {
  const params = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    get
      .getPersonDetails(params, "credits")
      .then((results) => {
        setData((prev) => ({
          ...prev,
          credits: results,
        }));
      })
      .catch((error) => {
        console.error(error);
      });

    get
      .getPersonDetails(params, "link")
      .then((results) => {
        setData((prev) => ({
          ...prev,
          link: results,
        }));
      })
      .catch((error) => {
        console.error(error);
      });

    get
      .getPersonDetails(params, "person")
      .then((results) => {
        setData((prev) => ({
          ...prev,
          person: results,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params]);

  return (
    <div className="container mx-auto my-2 sm:my-4 gap-4 px-4">
      <div className="grid grid-cols-12 bg-secondary rounded-2xl overflow-clip gap-4 p-4">
        <div className="col-span-full sm:col-span-4 ">
          <div
            className="p-4 bg-black/80 absolute rounded-tl-sm rounded-br-sm cursor-pointer"
            onClick={() => navigate(-1)}
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
              className="w-1/2 sm:w-full mx-auto aspect-square sm:aspect-[3/4] object-cover rounded-sm"
            />
          ) : (
            <div className="aspect-square sm:aspect-[3/4] w-1/2 sm:w-full mx-auto bg-gray-400 font-bold text-2xl flex items-center text-center rounded-sm">
              Image Not Found
            </div>
          )}
          <div className=" flex flex-col gap-4 sm:flex-col-reverse  mt-2">
            <div className="">
              <div className="font-bold text-xl sm:text-2xl sm:hidden text-highlight text-center sm:text-start">
                {data?.person?.name}
              </div>
              <div className="flex gap-4 mx-auto sm:mx-0 w-fit">
                {data?.link?.instagram_id && (
                  <a
                    href={`https://www.instagram.com/${data?.link?.instagram_id}/?hl=id`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={instagram} alt="" className="w-8 aspect-square" />
                  </a>
                )}
                {data?.link?.twitter_id && (
                  <a
                    href={`https://twitter.com/${data?.link?.twitter_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={twitter} alt="" className="w-8 aspect-square" />
                  </a>
                )}
                {data?.link?.tiktok_id && (
                  <a
                    href={`https://www.tiktok.com/@${data?.link?.tiktok_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={tiktok} alt="" className="w-8 aspect-square" />
                  </a>
                )}
              </div>
            </div>
            <div className="text-start sm:text-start">
              <div className="font-bold text-base sm:text-2xl text-highlight border-b border-highlight mb-1">
                Personal Info
              </div>
              <div className="text-sm sm:text-base text-highlight">
                <span className="font-bold">Known for: </span>
                {data?.person?.known_for_department}
              </div>
              <div className="text-sm sm:text-base text-highlight">
                <span className="font-bold">Birthday: </span>
                {data?.person?.birthday} (
                {execute.handleCalculateAge(
                  data?.person?.birthday,
                  data?.person?.deathday
                )}
                )
              </div>
              <div className="text-sm sm:text-base text-highlight">
                <span className="font-bold">Place of Birth: </span>
                {data?.person?.place_of_birth}
              </div>
              <div className="text-sm sm:text-base text-highlight">
                <span className="font-bold">Deathday: </span>
                {data?.person?.deathday ? data?.person?.deathday : "-"}
              </div>
              <div className="text-sm sm:text-base text-highlight">
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
            {data?.person?.biography && (
              <div className="">
                <div className="text-xl font-bold border-b sm:border-b-0">Biography</div>
                <div className="h-40 overflow-auto">
                  {data?.person?.biography ? data?.person?.biography : "-"}
                </div>
              </div>
            )}

            <div className="">
              <MiniCard
                data={data?.credits?.cast?.slice(0, 20)}
                type="creditMovie"
                onClick={execute.handleScrollToTop()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetails;
