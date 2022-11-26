import "./App.css";
import NavbarComp from "./components/NavbarComp";
import React from "react";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="App">
        <NavbarComp />
        <Footer className="footer" />
      </div>
    </>
  );
}

export default App;
