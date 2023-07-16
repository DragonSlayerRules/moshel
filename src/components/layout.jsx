import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import logo from "../assets/frameWhite.png";
import lan from "../assets/logo/lan.svg";
import email from "../assets/logo/email.svg";
import call from "../assets/logo/call.svg";
import insta from "../assets/logo/insta.svg";
import compass from "../assets/logo/compass.svg";
import arrowDown from "../assets/logo/arrowDown.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const [drop, setDrop] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();

    // Navigate to the search path with the query parameter
    navigate(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <>
      <div className="absolute w-full bg-transparant z-40 top-0">
        <div className="container mx-auto w-full h-full flex justify-between gap-2 sm:gap-4 py-4 px-4 items-center">
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-1/2 relative">
            <img
              src={logo}
              alt=""
              className="w-16 sm:w-20 cursor-pointer"
              onClick={() => navigate(`/`)}
            />
            <form
              className="h-10 items-center flex duration-500 transition-all"
              onSubmit={handleSearch}
            >
              <input
                placeholder="movie"
                value={query}
                type="text"
                className="w-full outline-none rounded-l-md xxs:flex xxs:w-20 xs:w-full px-2 border-l border-t border-b border-highlight bg-transparent text-lg h-full text-highlight"
                onChange={(e) => setQuery(e.target.value)}
              />

              <button
                className="border-r border-t border-b border-l-0 rounded-md rounded-l-none xxs:rounded-r-md border-highlight px-2 sm:px-4 xxs:pr-2 bg-transparent  h-full items-center justify-center"
                type="submit"
              >
                <BiSearch className="h-full aspect-square fill-highlight" />
              </button>
            </form>
            <img src={compass} alt="" className="aspect-square h-8" />
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/auth"
              className="border border-highligt text-highlight h-10 px-2 sm:px-4 text-base sm:text-lg flex items-center rounded-md"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
      {children}
      <div className="bg-secondary py-10">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row space-y-4">
          <div className="w-full sm:w-1/2 space-y-4">
            <img src={logo} alt="" className="w-20" />
            <div className="text-highlight">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias
              amet animi at aliquam doloribus placeat. Nulla temporibus autem
              laudantium a facilis! Saepe distinctio expedita vitae ducimus
              consectetur, quidem reprehenderit sed suscipit, nesciunt sunt
              optio ipsam dignissimos! Quis iusto quae saepe nemo rerum dolore
              distinctio, nostrum dolores aliquid sit, debitis suscipit?
            </div>
          </div>
          <div className="w-full sm:w-1/2 flex flex-col items-start sm:items-end gap-2">
            <div>
              <div className="text-2xl font-revxRegular text-highlight">
                CONTACT
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 text-highlight font-2xl">
                  <img src={email} alt="" />
                  moshel@gmail.com
                </div>
                <div className="flex gap-2 text-highlight font-2xl">
                  <img src={call} alt="" />
                  +62 8124 8199 227
                </div>
                <div className="flex gap-2 text-highlight font-2xl">
                  <img src={insta} alt="" />
                  moshel.id
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;