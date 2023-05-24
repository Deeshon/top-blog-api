import { useEffect, useState } from "react";
import Home from "./components/Home";
import Post from "./components/Post";
import {BrowserRouter, Routes, Route} from "react-router-dom"


function App() {

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path='/post/:id' element={<Post />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );


}

export default App;
