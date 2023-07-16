import React from "react";
import Layout from "./components/layout";
import Home from "./page/home";
import Details from './page/details'
import Error from './page/error'
import Search from "./page/search";
import {
  Routes,
  Route,
} from "react-router-dom";
import Explore from "./page/explore";
import Profile from "./page/profile";
import Auth from "./page/auth";

function App() {
  return (
    <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/details/:userId" element={<Details/>}/>
          <Route path="/search/:query" element={<Search/>}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/profile/:userId" element={<Profile/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/error" element={<Error/>}/>

          {/* <Route path="/details" component={<Details/>} /> */}
        </Routes>
    </Layout>
  );
}

export default App;
