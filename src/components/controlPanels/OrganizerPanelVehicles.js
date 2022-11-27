// import React, { useState, useEffect } from "react";
import React from 'react';

// import axios from "axios";
// import Cookies from "js-cookie";
// import Table from "react-bootstrap/Table";
// import { Spinner } from "react-bootstrap";
// import EditableRowVehicle from "../tableRows/EditableRowVehicle";
// import ReadOnlyRowVehicle from "../tableRows/ReadOnlyRowVehicle";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { BiAddToQueue } from "react-icons/bi";

const OrganizerPanelVehicles = () => {
  // const [vehicles, setVehicles] = useState(null);
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const [addFormData, setAddFormData] = useState({
  //   number: "",
  //   type: "",
  // });
  // const [editFormData, setEditFormData] = useState({
  //   id: "",
  //   number: "",
  //   type: "",
  // });

  // const [message, setMessage] = useState("");
  // const [editVehicleId, setEditVehicleId] = useState(null);

  // const userId = JSON.parse(Cookies.get("_auth_state")).data.id;

  // useEffect(() => {
  //   axios({
  //     url: "https://localhost:8443/api/v1/organizer/getVehicles/" + userId,
  //     method: "get",
  //     headers: {
  //       Authorization: "Bearer_" + Cookies.get("_auth"),
  //     },
  //   })
  //     .then((response) => {
  //       setVehicles(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Operation result</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Got it
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="organizer-header">
        <h3 style={{ color: "white" }}>Your routes</h3>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Form.Control
            type="search"
            placeholder="Search by number"
            className="me-2"
            aria-label="Search"
            style={{ width: "200px" }}
            onChange={(e) => {
              setCurrNumber(e.target.value);
              console.log(currNumber);
            }}
          />
          <Button>
            Add <BiAddToQueue />
          </Button>
        </div>
      </div>
      {routes !== null ? (
        <form
          onSubmit={handleEditFormSubmit}
          style={{ margin: "0px 14% 150px 14%" }}
        >
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Id</th>
                <th>Type</th>
                <th>Number</th>
                <th>Stops</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((currRoute) => {
                if (
                  (currRoute.number !== null &&
                    currRoute.number.toString().indexOf(currNumber) !== -1) ||
                  currNumber === ""
                ) {
                  if (currRoute.id === editRouteId) {
                    return (
                      <EditableRow
                        stops={stops}
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    );
                  } else {
                    return (
                      <ReadOnlyRow
                        route={currRoute}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    );
                  }
                }
                return <></>;
              })}
            </tbody>
          </Table>
        </form>
      ) : (
        <Spinner style={{ color: "white" }} />
      )} */}
    </>
  );
};

export default OrganizerPanelVehicles;
