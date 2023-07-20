import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/layout";
import Home from "./page/home";
import Error from './page/error'
import Search from "./page/search";
import MovieDetails from "./page/movieDetails";
import PersonDetails from "./page/personDetails";
import Explore from "./page/explore";
import Auth from "./page/auth";
import Test from "./page/test";

function App() {
  return (
    <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/details/:type/:userId" element={<MovieDetails/>}/>
          <Route path="/search/:query/:page" element={<Search/>}/>
          <Route path="/explore/:page" element={<Explore/>}/>
          <Route path="/profile/:userId" element={<PersonDetails/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="*" element={<Error/>}/>
          <Route path="/test" element={<Test/>}/>
        </Routes>
    </Layout>
  );
}

export default App;
