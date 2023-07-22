import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/organisms/layout";
import Home from "./page/home";
import Error from "./page/error";
import Search from "./page/search";
import MovieDetails from "./page/movieDetails";
import PersonDetails from "./page/personDetails";
import Auth from "./page/auth";
import Test from "./page/test";
import Discover from "./page/discover";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/details/:type/:userId" element={<MovieDetails />} />
        <Route path="/search/:type/:query/:page" element={<Search />} />
        <Route path="/discover/:type/:page" element={<Discover />} />
        <Route path="/profile/:userId" element={<PersonDetails />} />
        <Route path="/auth/:type" element={<Auth />} />
        <Route path="*" element={<Error />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Layout>
  );
}

export default App;
