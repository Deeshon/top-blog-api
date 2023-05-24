import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Write from "./pages/Write";
import {BrowserRouter, Routes, Route} from "react-router-dom"


function App() {

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path='/post/:id' element={<Post />} ></Route>
          <Route path='/post/create' element={<Write />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );


}

export default App;
