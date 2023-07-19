import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/movieCard";

function Profile() {
  const params = useParams();
  const [data, setData] = useState({});
  const sortPopular = (data) => {
    return data?.sort((a, b) => b.popularity - a.popularity);
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
  }, [params.userId]);

  return (
    <div className="container mx-auto my-2 sm:my-4 gap-4 px-4">
      <div className="grid grid-cols-12 bg-secondary rounded-2xl overflow-clip gap-2 sm:gap-4 p-4">
        <div className="col-span-full sm:col-span-4">
          {data?.person?.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${data?.person?.profile_path}`}
              alt=""
              className="w-1/2 sm:w-full mx-auto aspect-square sm:aspect-[3/4] object-cover rounded-md"
            />
          ) : (
            <div className="aspect-[3/4] bg-gray-400 font-bold text-2xl flex items-center justify-center">
              Image Not Found
            </div>
          )}
        </div>
        <div className="col-span-full sm:col-span-8 text-highlight space-y-2">
          <div className="font-bold text-2xl sm:text-4xl text-center sm:text-start">{data?.person?.name}</div>
          <div className="">
            <div className="text-xl font-bold ">Biography</div>
            <div className="h-40 overflow-auto">
              {data?.person?.biography ? data?.person?.biography : "-"}
            </div>
          </div>
          <div className="">
            <div className="text-xl font-bold ">Also known as</div>
            <div className="flex overflow-auto ">
              <div className="flex gap-2">
                {sortPopular(data?.credits?.cast)
                  ?.slice(0, 8)
                  .map((unit, index) => (
                    <div key={index} className="rounded-md overflow-clip w-40">
                      <img
                        className="aspect-[3/4] object-cover"
                        src={`https://image.tmdb.org/t/p/w500/${unit.poster_path}`}
                        alt=""
                      />
                      <div className="bg-white/50 truncate px-2 font-bold text-lg text-secondary">
                        {unit.title}
                        {console.log(unit)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
