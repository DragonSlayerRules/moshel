import React from "react";

function SkeletonPotrait({ aspect, width }) {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((unit) => (
        <div
          key={unit}
          className={`${aspect === "1/2" ? "aspect-[1/2]" : "aspect-[3/4]"} ${
            width === "fit" ? "w-40 sm:w-52" : "w-full"
          } animate-pulse bg-gray-300 rounded-md`}
        ></div>
      ))}
    </>
  );
}

export default SkeletonPotrait;
