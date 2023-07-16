import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieCard from "../components/movieCard";

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

      fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => response.json())
      .then((response) => setGenres(response.genres))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 grid grid-cols-12 my-6 gap-4">
      <div className="col-span-3 bg-secondary h-fit p-4">
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
      <div className="col-span-9 grid grid-cols-3 gap-4">{movieCard(data?.results)}</div>
    </div>
  );
}

export default Explore;
