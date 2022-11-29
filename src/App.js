import "./App.css";
import NavbarComp from "./components/NavbarComp";
import React from "react";
import Footer from "./components/Footer";
import "font-awesome/css/font-awesome.min.css";
import { I18nProvider, LOCALES } from "./i18n";

function App() {
  return (
    <I18nProvider locale={LOCALES.UKRAINIAN}>
      <div className="App">
        <NavbarComp style={{ position: "fixed" }} />
        <Footer className="footer" />
      </div>
    </I18nProvider>
  );
}

export default App;
