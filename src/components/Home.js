import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

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
              className="shadow-text my-5 display-3 fw-bold ls-tight px-3"
            >
              Congestion <br />
              <span className="text-primary">is no longer a problem</span>
            </h1>

            <p
              className="shadow-text px-3"
              style={{ fontSize: "20px", color: "white" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>

            {Cookies.get("_auth_state") == null ||
            (Cookies.get("_auth_state") !== null &&
              JSON.parse(Cookies.get("_auth_state")).data.subscriptions
                .length == 0) ? (
              <Button as={Link} to="/pricing" variant="primary">
                Subscribe now for only $4.99
              </Button>
            ) : (
              <></>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Home;
