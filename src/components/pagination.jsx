import { useState } from "react";
import { execute } from "../services/funtion";
import { useNavigate } from "react-router-dom";

export default function Pagination(p) {
  const { params, totalPage, totalResult } = p;
  console.log(
    "page:",
    params.page,
    "totalPage:",
    totalPage,
    "totalResult:",
    totalResult
  );
  const navigate = useNavigate();

  const [flag, setFlag] = useState({
    start: 1,
    end: 5,
  });

  let pages = [];

  for (let i = flag.start; i <= (totalPage < 5 ? totalPage : flag.end); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between border-t border-highlight bg-secondary rounded-2xl p-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href={`${params.page !== 1 && params.page - 1}`}
          className="relative inline-flex items-center rounded-md border border-highlight hover:text-secondary text-highlight px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href={`${params.page + 1}`}
          className="relative ml-3 inline-flex items-center rounded-md border border-highlight hover:text-secondary text-highlight px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {totalResult ? (
            <p className="text-sm text-highlight font-medium">
              Showing <span className="">{params.page}</span> to{" "}
              <span className="">{totalPage?.toLocaleString()}</span> of{" "}
              <span className="">{totalResult?.toLocaleString()}</span> results
            </p>
          ) : (
            <p className="text-lg text-highlight font-bold">
              Nothing Here, try somthing else
            </p>
          )}
        </div>
        <div>
          {totalResult && (
            <nav
              className="isolate inline-flex -space-x-px rounded-2xl shadow-sm"
              aria-label="Pagination"
            >
              <div
                onClick={() =>
                  flag.start <= 5
                    ? ""
                    : setFlag((prev) => ({
                        start: prev.start - 5,
                        end: prev.end - 5,
                      }))
                }
                className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-highlight hover:bg-highlight  text-highlight text-sm font-bold hover:text-secondary focus:z-20 focus:outline-offset-0"
              >
                {"<-"}
              </div>

              {pages?.map(
                (unit) =>
                  unit <= totalPage && (
                    <div
                      onClick={() => {
                        execute.handleScrollToTop();
                        navigate(
                          `/search/${params.type}/${params.query}/${unit}`
                        );
                      }}
                      aria-current="page"
                      className={`${
                        params.page === unit.toString()
                          ? "bg-highlight text-secondary"
                          : "bg-secondary"
                      } relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-highlight hover:text-secondary ring-1 ring-inset ring-gray-300 hover:bg-highlight focus:z-20 focus:outline-offset-0`}
                    >
                      {unit}
                    </div>
                  )
              )}
              <div
                onClick={() =>
                  pages[4] < totalPage &&
                  setFlag((prev) => ({
                    start: prev.start + 5,
                    end: prev.end + 5,
                  }))
                }
                className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-highlight  text-highlight text-sm font-bold hover:text-secondary focus:z-20 focus:outline-offset-0"
              >
                {"->"}
              </div>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
