import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";

const RoutesTable = ({ routes, rType }) => {
  const [show, setShow] = useState(false);
  const [activeRoute, setActiveRoute] = useState({});
  const [vehicleType, setvehicleType] = useState("Type");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openModalWithItem = (route) => {
    setActiveRoute(route);
    setvehicleType(route.type);
    console.log(activeRoute);
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
      <Modal show={show} onHide={handleClose}>
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
          <br/>
          <br/>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Stops</Accordion.Header>
              <Accordion.Body>
                {/* <RoutesTable routes={routes} rType={"bus"} /> */}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {}}>
            Save this route to your profile
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped>
        <thead>
          <tr>
            <th>Number</th>
            <th>Congestion</th>
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
                    <td style={estimateCongestion(currRoute.congestion)}>
                      {currRoute.congestion.toString().slice(0, 5)}%
                    </td>
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
              return <span></span>;
            })}
          </>
        </tbody>
      </Table>
    </>
  );
};

export default RoutesTable;
