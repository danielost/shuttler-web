import React, { useState, useEffect } from "react";
import { MDBFooter, MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { LOCALES } from "../i18n";
import { useCookies } from "react-cookie";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Footer = () => {
  const [enVariant, setEnVariant] = useState("primary");
  const [uaVariant, setUaVariant] = useState("secondary");
  const [cookies, setCookie] = useCookies(["_lang"]);

  const setLangaugeHandle = (locale) => {
    setCookie("_lang", locale);
    if (locale === LOCALES.ENGLISH) {
      setEnVariant("primary");
      setUaVariant("secondary");
    } else {
      setEnVariant("secondary");
      setUaVariant("primary");
    }
  };

  useEffect(() => {
    const lang = cookies["_lang"];
    if (lang !== null && lang === LOCALES.UKRAINIAN) {
      setEnVariant("secondary");
      setUaVariant("primary");
    }
  }, []);

  return (
    <MDBFooter className="bg-dark text-center text-white footer">
      <MDBContainer className="p-4 pb-0">
        <section className="mb-4">
          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="google" />
          </MDBBtn>
          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="github" />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div
        // className="text-center p-3"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          display: "grid",
          gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )",
          padding: "15px",
        }}
      >
        <div></div>
        <div>© 2022 Copyright: Danylo Ostapchenko</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <ButtonGroup aria-label="Basic example">
            <Button
              type="submit"
              variant={enVariant}
              style={{ padding: "3px" }}
              onClick={() => {
                setLangaugeHandle(LOCALES.ENGLISH);
              }}
            >
              en
            </Button>
            <Button
              type="button"
              onClick={() => {
                setLangaugeHandle(LOCALES.UKRAINIAN);
              }}
              variant={uaVariant}
              style={{ padding: "3px" }}
            >
              ua
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </MDBFooter>
  );
};

export default Footer;
