import React, { useEffect, useState } from "react";
import { get } from "../service/service";
import MovieCard from "../components/movieCard";
import Pagination from "../components/pagination";
import { useParams } from "react-router-dom";

function Explore() {
  const [genres, setGenres] = useState();
  const [filter, setFilter] = useState();
  const [data, setdata] = useState();
  const params = useParams();
  console.log("params", params);

  const sortList = [
    "popularity.asc",
    "popularity.desc",
    "revenue.asc",
    "revenue.desc",
    "primary_release_date.asc",
    "primary_release_date.desc",
    "vote_average.asc",
    "vote_average.desc",
    "vote_count.asc",
    "vote_count.desc",
  ];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWNjZjI2NDlhZmUzMmM2NWZhNWMwMGE2NDFlYmYwNyIsInN1YiI6IjY0YWJiOGFhOGEwZTliMDEwMGMzODhkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WzLmOCYKYl4YPdAmlcDMiT1ad-HfU7lAY1iTP4gPpFQ",
    },
  };

  const handleSearch = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${
        params.page
      }&sort_by=${filter?.sort ? filter.sort : "popularity.desc"}${
        filter?.genreId ? "&with_genres=" + filter.genreId : ""
      }`,
      options
    )
      .then((response) => response.json())
      .then((response) => setdata(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log("useEffect jalan");
    handleSearch();
    get
      .getGenres()
      .then((results) => {
        setGenres(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(data)

  return (
    <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4 my-2 sm:my-4">
      <div className="col-span-full lg:col-span-1">
        <div className="lg:sticky top-4">
          <div className=" bg-secondary h-fit p-4 rounded-2xl w-full">
            <div>
              <div className="text-xl font-bold text-highlight">Sort</div>
              <select
                id="cars"
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    sort: e.target.value,
                  }))
                }
                className="bg-primary/20 text-highlight outline-none font-bold rounded-md p-2 w-full"
              >
                <option value={undefined}>Select Genre</option>
                {sortList.map((unit, index) => (
                  <option value={unit} key={index}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-xl font-bold text-highlight">Genre</div>
              <select
                id="cars"
                onChange={(e) => setFilter({ genreId: e.target.value })}
                className="bg-primary/20 text-highlight outline-none font-bold rounded-md p-2 w-full"
              >
                <option value={undefined}>Select Genre</option>
                {genres?.map((unit, index) => (
                  <option value={unit.id} key={index}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="border border-highlight mt-4 w-full text-center py-2 text-base font-medium text-highlight rounded-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-full lg:col-span-3 xl:col-span-5">
        <div className="grid gap-2 sm:gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
          <MovieCard data={data?.results} />
        </div>
        <Pagination
          page={data?.page}
          totalPage={data?.total_pages}
          totalResult={data?.total_results}
        />
      </div>
    </div>
  );
}

export default Explore;
