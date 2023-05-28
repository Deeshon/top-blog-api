import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Write from "./pages/Write";
import Login from "./components/Login";
import Signup from './components/Signup'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from "./Layout";
import { UserContextProvider } from "./UserContext";
import Profile from "./pages/Profile";


function App() {

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path='/login' element={<Login />} ></Route>
              <Route path='/signup' element={<Signup />} ></Route>
              <Route path='/post/:id' element={<Post />} ></Route>
              <Route path='/profile/:id' element={<Profile />}></Route>
            </Route>
            <Route path='/post/create' element={<Write />}></Route>
            <Route path='/post/update/:id' element={<Write />}></Route>
          </Routes>
        </UserContextProvider>
    </div>
  );


}

export default App;
