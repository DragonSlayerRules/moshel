import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieCard from "../components/movieCard";
import profileCard from "../components/profileCard";
import MovieCard from "../components/movieCard";

function Search() {
  const params = useParams();
  const [data, setData] = useState();
  const [type, setType] = useState("movie");
  const types = [
    "movie",
    "tv",
    "person"
  ];

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
      `https://api.themoviedb.org/3/search/${type}?query=${params.query}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }, [type, params]);




  return (
    <div className="container mx-auto px-4 grid grid-cols-12 gap-4 my-6">
      <div className="col-span-3 bg-secondary h-fit p-4 pb-7 rounded-2xl">
        <div className="text-2xl font-bold text-highlight">Search Result</div>
        <div className="flex flex-col space-y-4 text-highlight mt-4">
          {types.map((unit, index) => (
            <div
              className={`${
                type === unit
                  ? "bg-highlight text-stroke border-stroke font-bold"
                  : "bg-transparent text-highlight font-medium"
              } cursor-pointer capitalize border border-highlight px-4 py-2`}
              onClick={() => setType(unit)}
              key={index}
            >
              {unit}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-4">
        {type === "movie" || type === "tv" ? <MovieCard data={data?.results}/> : profileCard(data?.results)}
      </div>
    </div>
  );
}

export default Search;
