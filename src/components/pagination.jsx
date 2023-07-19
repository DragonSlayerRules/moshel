export default function Pagination({ page, totalPage, totalResult }) {
  // console.log("page:", page, "totalPage:", totalPage, "totalResult:",totalResult)
  return (
    <div className="flex items-center justify-between border-t border-highlight bg-secondary rounded-2xl mt-4 p-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href={`${page !== 1 && page - 1}`}
          className="relative inline-flex items-center rounded-md border border-highlight hover:text-secondary text-highlight px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href={`${page + 1}`}
          className="relative ml-3 inline-flex items-center rounded-md border border-highlight hover:text-secondary text-highlight px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-highlight">
            Showing <span className="font-medium">{page}</span> to{" "}
            <span className="font-medium">{totalPage?.toLocaleString()}</span>{" "}
            of{" "}
            <span className="font-medium">{totalResult?.toLocaleString()}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-2xl shadow-sm"
            aria-label="Pagination"
          >
            <a
              href={`${page !== 1 && page - 1}`}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-highlight hover:bg-highlight  text-highlight text-sm font-bold hover:text-secondary focus:z-20 focus:outline-offset-0"
            >
              {"<-"}
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-highlight focus:outline-offset-0" */}
            <a
              href="1"
              aria-current="page"
              className={`${
                page === "1" ? "bg-highlight text-secondary" : "bg-secondary"
              } relative inline-flex items-center px-4 py-2 text-sm font-semibold text-highlight hover:text-secondary ring-1 ring-inset ring-gray-300 hover:bg-highlight focus:z-20 focus:outline-offset-0`}
            >
              1
            </a>
            <a
              href="2"
              className={`${
                page === "2" ? "bg-highlight text-secondary" : "bg-secondary"
              } relative inline-flex items-center px-4 py-2 text-sm font-semibold text-highlight hover:text-secondary ring-1 ring-inset ring-gray-300 hover:bg-highlight focus:z-20 focus:outline-offset-0`}
            >
              2
            </a>
            <a
              href="3"
              className={`${
                page === "3" ? "bg-highlight text-secondary" : "bg-secondary"
              } relative hidden items-center px-4 py-2 text-sm font-semibold text-highlight hover:text-secondary ring-1 ring-inset ring-gray-300 hover:bg-highlight focus:z-20 focus:outline-offset-0 md:inline-flex`}
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-highlight ring-1 ring-inset ring-highlight focus:outline-offset-0">
              ...
            </span>
            <a
              href="8"
              className={`${
                page === "8" ? "bg-highlight text-secondary" : "bg-secondary"
              } relative hidden items-center px-4 py-2 text-sm font-semibold text-highlight hover:text-secondary ring-1 ring-inset ring-gray-300 hover:bg-highlight focus:z-20 focus:outline-offset-0 md:inline-flex`}
            >
              8
            </a>
            <a
              href="9"
              className={`${
                page === "9" ? "bg-highlight text-secondary" : "bg-secondary"
              } relative inline-flex items-center px-4 py-2 text-sm font-semibold text-highlight hover:text-secondary ring-1 ring-inset ring-gray-300 hover:bg-highlight focus:z-20 focus:outline-offset-0`}
            >
              9
            </a>
            <a
              href="10"
              className={`${
                page === "10" ? "bg-highlight text-secondary" : "bg-secondary"
              } relative inline-flex items-center px-4 py-2 text-sm font-semibold text-highlight hover:text-secondary ring-1 ring-inset ring-gray-300 hover:bg-highlight focus:z-20 focus:outline-offset-0`}
            >
              10
            </a>
            <a
              href={`${page + 1}`}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-highlight  text-highlight text-sm font-bold hover:text-secondary focus:z-20 focus:outline-offset-0"
            >
              {"->"}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
