import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FormattedMessage } from "react-intl";
import Logo from "../imgs/logo.png";

const Home = () => {
  return (
    <div>
      <MDBContainer fluid className="p-4">
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              style={{ color: "white" }}
              className="my-5 display-3 fw-bold ls-tight px-3"
            >
              <FormattedMessage id="expr" />
            </h1>

            <p className="px-3" style={{ fontSize: "20px", color: "white" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>

            {Cookies.get("_auth_state") == null ||
            (Cookies.get("_auth_state") !== null &&
              JSON.parse(Cookies.get("_auth_state")).data.subscriptions
                .length === 0) ? (
              <Button as={Link} to="/pricing" variant="primary">
                <FormattedMessage id="subnow" /> $4.99
              </Button>
            ) : (
              <></>
            )}
          </MDBCol>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <img alt="Shuttler Logo" src={Logo} width="300px" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Home;
