import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Table from "react-bootstrap/Table";
import { Spinner } from "react-bootstrap";
import EditableRow from "../tableRows/EditableRow";
import ReadOnlyRow from "../tableRows/ReadOnlyRow";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiAddToQueue } from "react-icons/bi";

const OrganizerPanelRoutes = () => {
  const [routes, setRoutes] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const allowedTypes = ["bus", "trolleybus", "tram"];

  const [addFormData, setAddFormData] = useState({
    number: "",
    type: "",
  });
  const [editFormData, setEditFormData] = useState({
    id: "",
    number: "",
    type: "",
  });

  const [message, setMessage] = useState("");
  const [currNumber, setCurrNumber] = useState("");
  const [editRouteId, setEditRouteId] = useState(null);

  const userId = JSON.parse(Cookies.get("_auth_state")).data.id;

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedRoute = {
      id: editRouteId,
      type: editFormData.type,
      number: editFormData.number,
    };

    console.log(routes);
    console.log("Type: " + editedRoute.type);
    console.log("Number: " + editedRoute.number);

    const index = allowedTypes.indexOf(editedRoute.type);
    if (index === -1) {
      setMessage(
        "Error: " +
          editedRoute.type +
          " - bad type: allowed types are {" +
          allowedTypes +
          "}"
      );
      handleShow();
      return 0;
    }

    axios({
      url:
        "https://localhost:8443/api/v1/organizer/updateRoute/" + editedRoute.id,
      method: "put",
      data: {
        number: editedRoute.number,
        type: allowedTypes[index],
      },
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        setMessage("Route updated");
        handleShow();
        console.log(response.data);
        const newRoutes = [...routes];

        const index = routes.findIndex((route) => route.id === editRouteId);

        newRoutes[index].type = editedRoute.type;
        newRoutes[index].number = editedRoute.number;

        setRoutes(newRoutes);
        setEditRouteId(null);
      })
      .catch((err) => {
        setMessage("Number is already taken");
        handleShow();
      });
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newRoute = {
      type: addFormData.type,
      number: addFormData.number,
    };

    const newRoutes = [...routes, newRoute];
    setRoutes(newRoutes);
  };

  const handleEditClick = (event, route) => {
    event.preventDefault();
    setEditRouteId(route.id);

    const formValues = {
      id: route.id,
      type: route.type,
      number: route.number,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditRouteId(null);
  };

  const handleDeleteClick = (routeId) => {
    axios({
      url: "https://localhost:8443/api/v1/organizer/deleteRoute/" + routeId,
      method: "delete",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        setMessage("Route deleted");
        handleShow();
        console.log(response.data);
      })
      .catch((err) => {
        setMessage(err);
        handleShow();
        console.log(err);
      });
    const newRoutes = [...routes];

    const index = routes.findIndex((route) => route.id === routeId);

    newRoutes.splice(index, 1);

    setRoutes(newRoutes);
  };

  useEffect(() => {
    axios({
      url: "https://localhost:8443/api/v1/organizer/getRoutes/" + userId,
      method: "get",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        setRoutes(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
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
          <Table striped bordered hover variant="light" size="sm">
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
      )}
    </>
  );
};

export default OrganizerPanelRoutes;
