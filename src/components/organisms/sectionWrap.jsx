import React from "react";

function SectionWrap({ children, param }) {
  // const [flag, setFlag] = useState('today')
  return (
    <div>
      <div className="container mx-auto px-4 my-2 sm:my-6 ">
        <div className="flex items-center justify-start gap-4 w-full">
          <div className="text-2xl sm:text-3xl font-revxRegular font-bold ">
            {param === "popular"
              ? "Popular"
              : param === "topRated"
              ? "Top Rated"
              : param === "upComing"
              ? "Up Coming"
              : param === "trending" && "Trending"}
          </div>
          {/* <div className="rounded-sm flex overflow-clip text-sm text-highlight font-bold border-2 border-secondary sm:rounded-md bg-primary mb-2">
            <div className={`${flag === 'today' ? 'bg-secondary text-highlight' : 'text-secondary' } px-4 py-1 cursor-pointer`} onClick={()=>{
                setFlag('today')
            }}>TODAY</div>
            <div className={`${flag === 'week' ? 'bg-secondary text-highlight' : 'text-secondary' } px-4 py-1 cursor-pointer`} onClick={()=>{
                setFlag('week')
            }}>THIS WEEK</div>
          </div> */}
        </div>
        <div className="relative overflow-clip mt-1">
          <div className="flex justify-end z-50 w-full h-0">
            <div className="h-[60rem] w-2 z-20 bg-gradient-to-l from-primary absolute"></div>
          </div>
          <div className="flex overflow-scroll w-full snap-x">
            <div className="flex gap-2 sm:gap-4 ">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionWrap;
