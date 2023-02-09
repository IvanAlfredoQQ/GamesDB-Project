import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Header from "./components/Header";
import Form from "./components/Form";
import Error from "./components/Error"

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <div style={{ padding: "20px" }}>
        {/*Container DIV*/}
        <div>
          {" "}
          {/*HEADER DIV*/}
          {location.pathname !== "/" ? <Header /> : null}
        </div>
        <Routes>
          <Route path="/*" element={<Error/>} />
          <Route exact path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/form" element={<Form />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
