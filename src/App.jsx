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
import Test from "./page/test";

function App() {
  return (
    <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/details/:type/:userId" element={<Details/>}/>
          <Route path="/search/:query/:page" element={<Search/>}/>
          <Route path="/explore/:page" element={<Explore/>}/>
          <Route path="/profile/:userId" element={<Profile/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/error" element={<Error/>}/>
          <Route path="/test" element={<Test/>}/>

          {/* <Route path="/details" component={<Details/>} /> */}
        </Routes>
    </Layout>
  );
}

export default App;
