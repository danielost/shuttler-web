import "./App.css";
import NavbarComp from "./components/NavbarComp";
import React from "react";
import Footer from "./components/Footer";
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <>
      <div className="App">
        <NavbarComp style={{position:"fixed"}} />
        <Footer className="footer" />
      </div>
    </>
  );
}

export default App;
