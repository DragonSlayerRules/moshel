import React, { useCallback, useEffect, useState } from "react";
import { get } from "../services/service";
import MovieCard from "../components/atoms/movieCard";
import Pagination from "../components/molecules/pagination";
import { useNavigate, useParams } from "react-router-dom";
import { execute } from "../services/funtion";

function Discover() {
  const [genres, setGenres] = useState();
  const [filter, setFilter] = useState({
    genreId: undefined,
    sort: "popularity.desc",
  });
  const [data, setdata] = useState();
  const navigate = useNavigate();
  const params = useParams();

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

  const handleDiscover = useCallback(() => {
    get
      .getDiscover(filter, params)
      .then((results) => {
        setdata(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filter, params]);

  useEffect(() => {
    handleDiscover();
    get
      .getGenres(params.type)
      .then((results) => {
        setGenres(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params, handleDiscover]);

  return (
    <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4 my-2 sm:my-4">
      <div className="col-span-full lg:col-span-1 h-fit lg:sticky lg:top-4">
        <div className=" bg-secondary h-fit rounded-2xl w-full">
          <div className="rounded-t-2xl flex w-full overflow-clip ">
            <div
              className={`${
                params.type === "movie" ? "bg-secondary" : " bg-highlight"
              } text-highlight font-bold p-2 space-x-1 bg-primary/20 w-full cursor-pointer text-center`}
              onClick={() => {
                execute.handleScrollToTop();

                navigate(`/discover/movie/1`);
              }}
            >
              Film
            </div>
            <div
              className={`${
                params.type === "tv" ? "bg-secondary" : "bg-highlight"
              } text-highlight font-bold p-2 space-x-1 bg-primary/20 w-full cursor-pointer text-center`}
              onClick={() => {
                execute.handleScrollToTop();
                navigate(`/discover/tv/1`);
              }}
            >
              TV
            </div>
          </div>
          <div className="px-4 mt-2">
            <div className="text-xl font-bold text-highlight">Sort</div>
            <select
              id="sort"
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  sort: e.target.value,
                }))
              }
              className="bg-primary/20 text-highlight outline-none font-bold rounded-md p-2 w-full"
            >
              {execute
                .handleClearDotsAndUnderscore(sortList)
                .map((unit, index) => (
                  <option value={unit} key={index}>
                    {unit}
                  </option>
                ))}
            </select>
          </div>
          <div className="px-4 pb-4">
            <div className="text-xl font-bold text-highlight">Genre</div>
            <select
              id="genre"
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  genreId: e.target.value,
                }))
              }
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
          {/* <div className="p-4">
            <button
              className="border border-highlight w-full text-center py-2 text-base font-medium text-highlight rounded-md"
              onClick={handleDiscover}
            >
              Search
            </button>
          </div> */}
        </div>
      </div>

      <div className="col-span-full lg:col-span-3 xl:col-span-5">
        {data?.total_results ? (
          <div className="grid gap-2 sm:gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 mb-2">
            <MovieCard
              data={data?.results}
              type={params.type}
              location="back"
            />
          </div>
        ) : (
          ""
        )}
        <Pagination
          from="discover"
          params={params}
          totalPage={data?.total_pages}
          totalResult={data?.total_results}
        />
      </div>
    </div>
  );
}

export default Discover;
