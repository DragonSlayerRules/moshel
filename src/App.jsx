import { useEffect, useState } from "react";
import "./App.css";
import { BiSearch } from "react-icons/bi";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiArrowRightLine,
  RiArrowLeftLine,
} from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import imageNotFound from "./assets/404 Error-cuate.svg";
import logo from "./assets/logo.png";

function App() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState([]);
  const [data, setData] = useState();
  const [local, setLocal] = useState({});

  const [typeDrop, setTypeDrop] = useState(false);
  const [type, setType] = useState("all");

  const [year, setYear] = useState("");

  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState(true);
  const [pop, setPop] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favText, setFavText] = useState("Add to favorite");
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    if (input !== "") {
      setLoading(true);
      try {
        const resp = await fetch(
          `https://www.omdbapi.com/?apikey=85f717e8&s=${input}&type=${
            type === "all" ? "" : type
          }&y=${year === "all" ? "" : year}`
        );
        const jsonData = await resp.json();
        // setType(type);
        setSearch(jsonData.Search);
        setHome(false);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    // setInput("");
  };

  const handleOpen = async (imdbID) => {
    const insideChest = await JSON.parse(localStorage?.getItem("chest"));
    if (insideChest?.indexOf(imdbID) === -1) {
      setFavText("Add to favorite");
    } else {
      setFavText("saved");
    }

    try {
      const resp = await fetch(
        `https://www.omdbapi.com/?apikey=85f717e8&i=${imdbID}`
      );
      const jsonData = await resp.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePage = async (count) => {
    try {
      setLoading(true);

      if (page >= 1 && count === "plus") {
        const resp = await fetch(
          `https://www.omdbapi.com/?apikey=85f717e8&s=${input}&type=${
            type === "all" ? "" : type
          }&y=${year === "all" ? "" : year}&page=${page + 1}`
        );
        const jsonData = await resp.json();
        setSearch(jsonData.Search);
        setPage(page + 1);
      } else if (page > 1 && count === "minus") {
        const resp = await fetch(
          `https://www.omdbapi.com/?apikey=85f717e8&s=${input}&type=${
            type === "all" ? "" : type
          }&y=${year === "all" ? "" : year}&page=${page - 1}`
        );
        const jsonData = await resp.json();
        setSearch(jsonData.Search);
        setPage(page - 1);
      }
      setHome(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocalStorage = (data) => {
    const insideChest = JSON.parse(localStorage?.getItem("chest"));
    const insideFav = JSON.parse(localStorage?.getItem("fav"));

    if (insideChest !== null) {
      if (insideChest.indexOf(data.imdbID) === -1) {
        insideChest.push(data.imdbID);
        insideFav.push(data);
        localStorage.setItem("chest", JSON.stringify(insideChest));
        localStorage.setItem("fav", JSON.stringify(insideFav));
        setFavText("saved");
      }
    } else {
      localStorage.setItem("chest", JSON.stringify([data.imdbID]));
      localStorage.setItem("fav", JSON.stringify([data]));
      setFavText("saved");
    }
  };

  useEffect(() => {
    setLocal(JSON.parse(localStorage.getItem("fav")));
  }, [favorite]);

  return (
    <>
      {favorite ? (
        <div className="w-full h-screen flex items-center justify-center bg-transparent backdrop-blur-sm z-50 fixed px-4">
          <div className="container w-full h-full flex justify-center items-center mx-auto px-4">
            <div className="h-4/5 lg:h-1/2 w-full lg:w-4/5 bg-tertiary border-2 border-stroke p-4 rounded-lg overflow-y-scroll">
              <div className="flex justify-end gap-4 col-span-full">
                <button
                  onClick={() => {
                    favorite ? setFavorite(false) : setFavorite(true);
                  }}
                >
                  <GrClose className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {local?.map((unit) => (
                  <div className="grid grid-cols-3">
                    <img src={unit.Poster} alt="" className="col-span-1" />
                    <div className="col-span-2">
                      <div className="flex font-bold space-x-2">
                        <div>Genre: </div>
                        <div className="font-medium">{unit?.Genre}</div>
                      </div>
                      <div className="flex font-bold space-x-2">
                        <div>Imdb Rating: </div>
                        <div className="font-medium">{unit?.imdbRating}</div>
                      </div>
                      <div className="flex font-bold space-x-2">
                        <div>Year: </div>
                        <div className="font-medium">{unit?.Year}</div>
                      </div>
                      <div className="flex font-bold space-x-2">
                        <div>Actors: </div>
                        <div className="font-medium">{unit?.Actors}</div>
                      </div>
                      <div className="flex font-bold space-x-2">
                        <div>Plot: </div>
                        <div className="font-medium">{unit?.Plot}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {pop ? (
        <div className="w-full h-screen flex items-center justify-center bg-transparent backdrop-blur-sm z-50 fixed px-4">
          <div className="container w-full h-full flex justify-center items-center mx-auto">
            <div className="h-4/5 lg:h-fit w-full sm:w-4/5 bg-tertiary border-2 border-stroke p-4 rounded-lg overflow-auto">
              <div className="flex justify-end gap-4 col-span-full">
                <button onClick={() => (pop ? setPop(false) : setPop(true))}>
                  <GrClose className="w-5 h-5 " />
                </button>
              </div>
              <div className="gap-4 mt-4 grid grid-cols-3">
                <img
                  src={data?.Poster}
                  alt={data?.Title}
                  className="rounded-lg posterRatio object-cover w-full h-full col-span-3 lg:col-span-1"
                ></img>
                <div className="col-span-3 lg:col-span-2 space-y-2 text-lg">
                  <div>
                    <div className="text-3xl font-bold">{data?.Title}</div>
                    <div className="h-px w-full bg-black mt-px"></div>
                  </div>
                  <div>
                    <div className="flex font-bold space-x-2">
                      <div>Genre: </div>
                      <div className="font-medium">{data?.Genre}</div>
                    </div>
                    <div className="flex font-bold space-x-2">
                      <div>Imdb Rating: </div>
                      <div className="font-medium">{data?.imdbRating}</div>
                    </div>
                    <div className="flex font-bold space-x-2">
                      <div>Year: </div>
                      <div className="font-medium">{data?.Year}</div>
                    </div>
                    <div className="flex font-bold space-x-2">
                      <div>Actors: </div>
                      <div className="font-medium">{data?.Actors}</div>
                    </div>
                    <div className="flex font-bold space-x-2">
                      <div>Rated: </div>
                      <div className="font-medium">{data?.Rated}</div>
                    </div>
                    <div className="flex font-bold space-x-2">
                      <div>Runtime: </div>
                      <div className="font-medium">{data?.Runtime}</div>
                    </div>
                  </div>
                  <div className="flex font-bold space-x-2">
                    <div>Plot: </div>
                    <div className="font-medium">{data?.Plot}</div>
                  </div>
                  <div className="w-full justify-center flex">
                    <button
                      className="bg-highlight rounded-lg border-2 border-stroke w-full mt-2 py-2 font-medium text-lg"
                      onClick={() => handleLocalStorage(data)}
                    >
                      {favText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Header */}
      <div className="bg-tertiary shadow-sm sticky z-40 top-0 ">
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full h-full gap-4 py-2 px-4 items-center">
          <div
            className="cursor-pointer logoRatio h-full flex items-center object-cover col-span-1 lg:col-span-1 xl:col-span-2 2xl:col-span-1 w-fit"
            onClick={() => setHome(true)}
          >
            <img src={logo} alt="" className="logoRatio h-full" />
          </div>
          <button
            className="bg-secondary border-stroke border-2 rounded-lg px-4 py-2 h-full"
            onClick={() => (favorite ? setFavorite(false) : setFavorite(true))}
          >
            Favorite
          </button>
          <input
            className={`outline-none bg-secondary border-2 border-stroke rounded-lg py-2 px-4 text-lg font-bold col-span-1 w-full h-full ${
              year.length > 4 ? "text-red-500" : ""
            }`}
            placeholder="all year"
            value={year}
            type="text"
            onChange={(e) => {
              const inputValue = e.target.value;
              if (!isNaN(inputValue)) {
                setYear(inputValue);
              }
            }}
          />
          <div className="col-span-1 h-full">
            <div
              className="border-2 bg-secondary border-stroke rounded-lg items-center gap-2 py-2 px-4 text-lg w-full h-full font-bold flex capitalize justify-between"
              onClick={() =>
                typeDrop ? setTypeDrop(false) : setTypeDrop(true)
              }
            >
              {type}
              {typeDrop ? <RiArrowUpLine /> : <RiArrowDownLine />}
            </div>
            <div
              className={`${
                typeDrop ? "block" : "hidden"
              } shrink-0 absolute flex flex-col gap-2 border-2 bg-secondary border-stroke rounded-lg py-2 px-4 duration-300 text-xl font-bold mt-2 `}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setType("all");
                  setTypeDrop(false);
                }}
                className="capitalize"
              >
                all
              </button>
              <div className="h-px bg-stroke"></div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setType("movie");
                  setTypeDrop(false);
                }}
                className="capitalize"
              >
                movie
              </button>
              <div className="h-px bg-stroke"></div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setType("series");
                  setTypeDrop(false);
                }}
                className="capitalize"
              >
                series
              </button>
              <div className="h-px bg-stroke"></div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setType("episode");
                  setTypeDrop(false);
                }}
                className="capitalize"
              >
                episode
              </button>
            </div>
          </div>
          <form className="h-full items-center w-full gap-2 flex col-span-full md:col-span-2 lg:col-span-4 xl:col-span-full 2xl:col-span-2">
            <input
              placeholder="movie"
              value={input}
              type="text"
              className="outline-none border-2 border-stroke rounded-lg py-2 px-4 text-lg font-bold w-full h-full"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="bg-highlight border-2 border-stroke rounded-lg px-4 flex h-full items-center justify-center"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <BiSearch className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      {/* Body */}
      <div
        className={`container mx-auto px-4 w-full mt-4 ${
          pop ? "sticky" : "relative"
        }`}
      >
        {home ? (
          <div className="w-full border">
            <div>home page</div>
          </div>
        ) : !loading ? (
          search ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {search.map((unit) => (
                  <div
                    className="col-span-1 bg-tertiary rounded-lg border-2 border-stroke h-fit p-2 cursor-pointer"
                    key={unit.imdbID}
                    onClick={() => {
                      pop ? setPop(false) : setPop(true);
                      handleOpen(unit.imdbID);
                    }}
                  >
                    {unit.Poster === "N/A" ? (
                      <img
                        src={imageNotFound}
                        alt={unit.Title}
                        className="rounded-lg posterRatio object-cover w-full h-full"
                      ></img>
                    ) : (
                      <img
                        src={unit.Poster}
                        alt={unit.Title}
                        className="rounded-lg posterRatio object-cover w-full h-full"
                      ></img>
                    )}
                    <div className="text-xl font-bold truncate">
                      {unit.Title}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 justify-center mt-5">
                <button
                  className="bg-highlight border-2 border-stroke p-2 rounded-lg"
                  onClick={() => handlePage("minus")}
                >
                  <RiArrowLeftLine />
                </button>
                <div className="bg-secondary px-4 py-2 border-2 border-stroke rounded-lg w-fit">
                  {page}
                </div>
                <button
                  className="bg-highlight border-2 border-stroke p-2 rounded-lg"
                  onClick={() => handlePage("plus")}
                >
                  <RiArrowRightLine />
                </button>
              </div>
            </div>
          ) : (
            "movie not found"
          )
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((unit) => (
              <div key={unit}>
                <div className="w-full aspect-[3/4] animate-pulse bg-gray-500"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
