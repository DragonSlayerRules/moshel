import React from "react";
import Hero from "../components/hero";
import Content from "../components/content";

function Home() {
  return (
    <div>
      <Hero />
      {Content("popular")}
      {Content("topRated")}
      {Content("upComing")}
    </div>
  );
}

export default Home;
