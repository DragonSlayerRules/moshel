import React from "react";

function SkeletonLandscape({ width }) {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((unit) => (
        <div
          key={unit}
          className={`${
            width === "fit" ? "w-60 sm:w-80" : "w-full"
          } aspect-video animate-pulse bg-gray-300 rounded-md`}
        ></div>
      ))}
    </>
  );
}

export default SkeletonLandscape;
