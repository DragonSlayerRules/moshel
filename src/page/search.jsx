import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/movieCard";
import Pagination from "../components/pagination";
import ProfileCard from "../components/profileCard";

function Search() {
  const params = useParams();
  const [data, setData] = useState();
  const [filter, setFilter] = useState("movie");

  useMemo(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNjZjI2NDlhZmUzMmM2NWZhNWMwMGE2NDFlYmYwNyIsInN1YiI6IjY0YWJiOGFhOGEwZTliMDEwMGMzODhkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WzLmOCYKYl4YPdAmlcDMiT1ad-HfU7lAY1iTP4gPpFQ",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/${filter}?query=${params.query}&page=${params.page}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }, [filter, params]);

  // console.log("*search", data);
  // console.log("*search", params);
  return (
    <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4 my-2 sm:my-4">
      <div className="col-span-full lg:col-span-1 bg-secondary h-fit p-4 pb-7 rounded-2xl">
        <div className="text-2xl font-bold text-highlight">Search Result</div>
        <div className="flex flex-col space-y-4 text-highlight mt-4">
          {["movie", "tv", "person"].map((unit, index) => (
            <div
              className={`${
                filter === unit
                  ? "bg-highlight text-stroke border-stroke font-bold"
                  : "bg-transparent text-highlight font-medium"
              } cursor-pointer capitalize border border-highlight px-4 py-2 rounded-md`}
              onClick={() => {
                setFilter(unit);
              }}
              key={index}
            >
              {unit}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-full lg:col-span-3 xl:col-span-5">
        <div className="grid gap-2 sm:gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
          {filter && filter !== "person" ? (
            <MovieCard data={data?.results} type={filter} />
          ) : (
            <ProfileCard data={data?.results} />
          )}
        </div>
        <Pagination
          page={params.page}
          totalPage={data?.total_pages}
          totalResult={data?.total_results}
        />
      </div>
    </div>
  );
}

export default Search;
