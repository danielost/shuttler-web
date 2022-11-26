import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import StopsTable from "./StopsTable";
import axios from "axios";
import Cookies from "js-cookie";

const RoutesTable = ({ routes, rType }) => {
  const [show, setShow] = useState(false);
  const [activeRoute, setActiveRoute] = useState({});
  const [vehicleType, setvehicleType] = useState("Type");
  const [activeRouteSaved, setActiveRouteSaved] = useState(false);

  const userSubscriptions = JSON.parse(Cookies.get("_auth_state")).data
    .subscriptions;
  const userId = JSON.parse(Cookies.get("_auth_state")).data.id;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios({
      url: "https://localhost:8443/api/v1/users/" + userId + "/savedRoutes",
      method: "get",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        // console.log(response.data);
        let foundRoute = response.data.find(
          (route) => route.id === activeRoute.id
        );
        if (foundRoute !== undefined) {
          setActiveRouteSaved(true);
        } else {
          setActiveRouteSaved(false);
        }
        // console.log(foundRoute);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeRoute]);

  const handleRouteSave = () => {
    axios({
      url:
        "https://localhost:8443/api/v1/users/" +
        userId +
        "/saveRoute?routeId=" +
        activeRoute.id,
      method: "put",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        setActiveRouteSaved(true);
        handleClose();
        // console.log("Route saved: " + response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRouteDelete = () => {
    axios({
      url:
        "https://localhost:8443/api/v1/users/" +
        userId +
        "/deleteRoute?routeId=" +
        activeRoute.id,
      method: "put",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        setActiveRouteSaved(false);
        handleClose();
        // console.log("Route deleted: " + response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openModalWithItem = (route) => {
    setActiveRoute(route);
    setvehicleType(route.type);
    handleShow();
  };

  const estimateCongestion = (cong) => {
    if (cong < 30) {
      return { verticalAlign: "middle", color: "green" };
    } else if (cong < 60) {
      return { verticalAlign: "middle", color: "#ffbe00" };
    } else {
      return { verticalAlign: "middle", color: "red" };
    }
  };

  return (
    <>
      <Modal dialogClassName="modal-width" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}{" "}
            {activeRoute.number}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={estimateCongestion(activeRoute.congestion)}>
            {(() => {
              if (Number(activeRoute.congestion) < 30) {
                return <>Low congestion</>;
              }
              if (Number(activeRoute.congestion) < 60) {
                return <>Moderate congestion</>;
              }
              return <>High congestion</>;
            })()}
          </span>
          <br />
          <br />
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Stops</Accordion.Header>
              <Accordion.Body style={{ padding: "0" }}>
                <StopsTable stops={activeRoute.stops} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          {activeRouteSaved ? (
            <Button
              variant="primary"
              onClick={() => {
                handleRouteDelete();
              }}
            >
              Remove this route from your profile
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                handleRouteSave();
              }}
            >
              Save this route to your profile
            </Button>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped>
        <thead>
          <tr>
            <th>Number</th>
            {userSubscriptions.length !== 0 ? <th>Congestion</th> : <></>}
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <>
            {routes.map((currRoute) => {
              if (currRoute.type === rType) {
                return (
                  <tr>
                    <td style={{ verticalAlign: "middle" }}>
                      {currRoute.number}
                    </td>
                    {userSubscriptions.length !== 0 ? (
                      <td style={estimateCongestion(currRoute.congestion)}>
                        {currRoute.congestion.toString().slice(0, 5)}%
                      </td>
                    ) : (
                      <></>
                    )}
                    <td style={{ verticalAlign: "middle" }}>
                      <Button
                        variant="primary"
                        onClick={() => {
                          openModalWithItem(currRoute);
                        }}
                      >
                        More info
                      </Button>
                    </td>
                  </tr>
                );
              }
              return <></>;
            })}
          </>
        </tbody>
      </Table>
    </>
  );
};

export default RoutesTable;
