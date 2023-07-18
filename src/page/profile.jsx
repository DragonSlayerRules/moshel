import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const params = useParams();
  const [data, setData] = useState();
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
      `https://api.themoviedb.org/3/person/${params.userId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }, [params.userId]);


  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-12 gap-4">
      <div className="col-span-4">
        {data?.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            alt=""
            className="aspect-[3/4] object-center"
          />
        ) : (
          <div className="aspect-[3/4] bg-gray-400 font-bold text-2xl flex items-center justify-center">
            Image Not Found
          </div>
        )}
      </div>
      <div className="col-span-8">
        <div className="font-bold text-4xl">{data?.name}</div>
        <div className="">
          <div className="text-xl font-bold ">Biography</div>
          {data?.biography ? data?.biography : "-"}
        </div>
        <div className="">
          <div className="text-xl font-bold ">Also known as</div>
          {data?.also_known_as?.map((unit) => (
            <>{unit}</>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
