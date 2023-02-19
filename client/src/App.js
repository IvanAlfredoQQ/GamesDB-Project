import "./App.css";
import React from "react";
import { Routes, Route, /*useLocation*/ } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
// import Header from "./components/Header";
import Form from "./components/Form";
import Error from "./components/Error";
import GameDetail from "./components/GameDetail"

function App() {
  
// const location = useLocation();  

  return (
    <div className="App">
      <div style={{ padding: "20px" }}>
        {/*Container DIV*/}
        {/* <div>
          {" "}
          {location.pathname === "/videogames" ? <Header /> : null}
        </div> */}
        <Routes>
          <Route path="/*" element={<Error/>} />
          <Route exact path="/" element={<Landing/>}></Route>
          <Route path="/videogames" element={<Home />}></Route>
          <Route path="/videogame/:id" element={<GameDetail/>}></Route>
          <Route path="/form" element={<Form />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
