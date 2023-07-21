import React from "react";

function SkeletonCard() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((unit) => (
        <div
          key={unit}
          className="w-40 aspect-square animate-pulse bg-gray-500 rounded-2xl"
        ></div>
      ))}
    </>
  );
}

export default SkeletonCard;
