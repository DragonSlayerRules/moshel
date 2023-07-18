import movieCard from "../components/movieCard";
import React, { useEffect, useState } from "react";
import { get } from "../service/service";
import MovieCard from "../components/movieCard";
// import Example from "../components/pagination";

function Explore() {
  const [genres, setGenres] = useState();
  const [filter, setFilter] = useState();
  const [data, setdata] = useState();

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
      `https://api.themoviedb.org/3/discover/movie?page=1&sort_by=popularity.desc&with_genres=${filter?.genreId}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setdata(response.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((response) => response.json())
      .then((response) => setdata(response))
      .catch((err) => console.error(err));

    get
      .getGenres()
      .then((results) => {
        setGenres(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(genres);

  return (
    <div className="container mx-auto px-4 grid grid-cols-12 my-6 gap-4">
      <div className="col-span-4 sm:col-span-2 bg-secondary h-fit p-4 pb-7 rounded-2xl">
        <div className="text-2xl font-bold text-highlight">Filter</div>
        <select
          id="cars"
          onChange={(e) => setFilter({ genreId: e.target.value })}
        >
          {genres?.map((unit, index) => (
            <option value={unit.id} key={index}>
              {unit.name}
            </option>
          ))}
        </select>
        <button
          className="border border-highlight px-4 py-2 text-base font-medium text-highlight"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="col-span-8 sm:col-span-10 ">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <MovieCard data={data?.results} />
          {/* {movieCard(data?.results)} */}
        </div>
        {/* {Example()} */}
      </div>
    </div>
  );
}

export default Explore;
