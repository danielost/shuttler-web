import "./App.css";
import NavbarComp from "./components/NavbarComp";
import React from "react";
import Footer from "./components/Footer";
import "font-awesome/css/font-awesome.min.css";
import { I18nProvider, LOCALES } from "./i18n";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["_lang"]);

  return (
    <I18nProvider locale={cookies["_lang"] !== null && cookies["_lang"] === LOCALES.UKRAINIAN ? LOCALES.UKRAINIAN : LOCALES.ENGLISH}>
      <div className="App">
        <NavbarComp style={{ position: "fixed" }} />
        <Footer className="footer" />
      </div>
    </I18nProvider>
  );
}

export default App;
