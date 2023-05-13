import { useEffect, useState } from "react";
import "./App.css";
import { BiSearch } from "react-icons/bi";
import imageNotFound from "./assets/404 Error-cuate.svg";

function App() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pop, setPop] = useState(false);
  const data = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch(
        `http://www.omdbapi.com/?apikey=dca61bcc&s=${input}`
      );
      const jsonData = await resp.json();
      setSearch(jsonData.Search);
      for (let i of jsonData.Search) {
        const fetchData = async () => {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=dca61bcc&i=${i.imdbID}`
          );
          data.push(await res.json());
        };
        fetchData();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setInput("");
  };

  console.log(data);
  // console.log("data", data);
  // useEffect(() => {
  //   const test = search.map((unit) => {
  //     const fetchData = async () => {
  //       const res = await fetch(
  //         `http://www.omdbapi.com/?apikey=dca61bcc&i=${unit.imdbID}`
  //       );
  //       data.push(res);
  //     };
  //     fetchData();
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [search]);

  // const handleSelectSubmit = async (imdb) => {
  //   setLoading(true);
  //   try {
  //     const resp = await fetch(
  //       `http://www.omdbapi.com/?apikey=dca61bcc&i=${imdb}`
  //     );
  //     const jsonData = await resp.json();
  //     setOneData(jsonData);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setInput("");
  // };

  return (
    <>
      {pop ? (
        <div className="w-screen h-screen flex items-center justify-center bg-transparent absolute">
          <div className="h-40 w-96 bg-tertiary border-2 border-stroke">
            <button onClick={() => (pop ? setPop(false) : setPop(true))}>
              BACK
            </button>
            {/* <div>{oneData.Title}</div> */}
          </div>
        </div>
      ) : (
        ""
      )}
      {/* Header */}
      <div className="bg-tertiary shadow-sm sticky top-0">
        <div className="container mx-auto grid grid-cols-3 gap-4 py-2 px-4 items-center">
          <div className="font-bold text-3xl col-span-2">Bro Movie</div>
          <form
            className="col-span-1 w-full flex justify-between gap-2"
            onSubmit={handleSubmit}
          >
            <input
              placeholder="name, actor, genre"
              value={input}
              type="text"
              className="outline-none border-2 border-stroke rounded-lg py-2 px-4 text-lg font-bold w-full"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="bg-highlight border-2 border-stroke rounded-lg px-4 flex items-center justify-center"
              type="submit"
            >
              <BiSearch className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      {/* Body */}
      <div className="container mx-auto px-4 mt-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {" "}
          {!loading
            ? search
              ? search.map((unit) => (
                  <div
                    className="col-span-1 bg-tertiary rounded-lg border-2 border-stroke h-fit p-2 "
                    key={unit.imdbID}
                    onClick={() => {
                      pop ? setPop(false) : setPop(true);
                      // handleSelectSubmit(unit.imdbID);
                    }}
                  >
                    {unit.Poster === "N/A" ? (
                      <img
                        src={imageNotFound}
                        alt={unit.Title}
                        className="rounded-lg posterRatio w-full h-full"
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
                ))
              : "movie not found"
            : "loading"}
        </div>
      </div>
    </>
  );
}

export default App;
