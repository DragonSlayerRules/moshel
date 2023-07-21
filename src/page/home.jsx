import React from "react";
import Hero from "../components/molecules/hero";
import Content from "../components/molecules/content";

function Home() {
  return (
    <div>
      <Hero />
      <Content param="popular" />
      <Content param="topRated" />
      <Content param="upComing" />
    </div>
  );
}

export default Home;
