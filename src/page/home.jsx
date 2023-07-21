import React from "react";
import Hero from "../components/molecules/hero";
import Content from "../components/molecules/content";
import Trending from "../components/molecules/trending";

function Home() {
  return (
    <div>
      <Hero />
      <Trending/>
      <Content param="popular" />
      <Content param="topRated" />
      <Content param="upComing" />

    </div>
  );
}

export default Home;
