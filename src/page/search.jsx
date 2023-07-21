import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "../components/movieCard";
import Pagination from "../components/pagination";
import ProfileCard from "../components/profileCard";
import { get } from "../services/service";
import { execute } from "../services/funtion";

function Search() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();

  useMemo(() => {
    get
      .getSearch(params)
      .then((results) => {
        setData(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params]);

  return (
    <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4 my-2 sm:my-4">
      <div className="col-span-full lg:col-span-1 bg-secondary h-fit p-4 pb-7 rounded-2xl lg:sticky lg:top-4">
        <div className="text-2xl font-bold text-highlight">Search Result</div>
        <div className="flex flex-col space-y-4 text-highlight mt-4">
          {["movie", "tv", "person"].map((unit, index) => (
            <div
              className={`${
                params.type === unit
                  ? "bg-highlight text-stroke border-stroke font-bold"
                  : "bg-transparent text-highlight font-medium"
              } cursor-pointer capitalize border border-highlight px-4 py-2 rounded-md`}
              onClick={() => {
                execute.handleScrollToTop();
                // setFilter(unit);
                navigate(`/search/${unit}/${params.query}/1`);
              }}
              key={index}
            >
              {unit}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-full lg:col-span-3 xl:col-span-5">
        {data?.total_results ? (
          params.type && params.type !== "person" ? (
            <div className="grid gap-2 sm:gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 mb-2">
              <MovieCard
                data={data?.results}
                type={params.type}
                location="back"
              />
            </div>
          ) : (
            <div className="grid gap-2 sm:gap-2 sm:grid-cols-2 xl:grid-cols-3 mb-2">
              <ProfileCard data={data?.results} />
            </div>
          )
        ) : (
          ""
        )}
        <Pagination
          from="search"
          params={params}
          totalPage={data?.total_pages}
          totalResult={data?.total_results}
        />
      </div>
    </div>
  );
}

export default Search;
