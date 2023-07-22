import React from "react";

function Test() {
  const handleBackgroundClick = () => {
    // Check if the clicked element is the background element
    console.log("Background clicked");
    // Add your background click logic here
  };

  const handleFrontButtonClick = (event) => {
    event.stopPropagation();
    console.log("Front button clicked");
    // Add your front button click logic here
  };

  return (
    <div onClick={handleBackgroundClick} className="bg-red-500 p-10">
      <button
        onClick={handleFrontButtonClick}
        className="bg-blue-200 px-4 py-2"
      >
        Front Button
      </button>
      {/* Other content */}
    </div>
  );
}

export default Test;
