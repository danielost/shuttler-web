import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Table from "react-bootstrap/Table";
import { Spinner } from "react-bootstrap";
import EditableRowRoute from "../tableRows/EditableRowRoute";
import ReadOnlyRowRoute from "../tableRows/ReadOnlyRowRoute";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiAddToQueue } from "react-icons/bi";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const OrganizerPanelRoutes = () => {
  const [routes, setRoutes] = useState(null);
  const [show, setShow] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAddForm = () => setShowAddForm(false);
  const handleShowAddForm = () => setShowAddForm(true);
  const allowedTypes = ["bus", "trolleybus", "tram"];
  const [stops, setStops] = useState(null);
  const [showToast, setShowToast] = useState(true);

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

    axios({
      url: "https://localhost:8443/api/v1/organizer/createRoute/" + userId,
      method: "post",
      data: {
        number: addFormData.number,
        type: addFormData.type,
      },
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        axios({
          url:
            "https://localhost:8443/api/v1/routes/getByNumber?number=" +
            addFormData.number,
          method: "get",
          headers: {
            Authorization: "Bearer_" + Cookies.get("_auth"),
          },
        })
          .then((responseSec) => {
            setMessage("Route added");
            handleShow();
            console.log(responseSec.data);

            const newRoutes = [...routes, responseSec.data];
            setRoutes(newRoutes);
          })
          .catch((err) => {
            setMessage(err);
            handleShow();
            console.log(err);
          });
      })
      .catch((err) => {
        setMessage(err);
        handleShow();
        console.log(err);
      });
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
    setShowToast(true);

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

    axios({
      url: "https://localhost:8443/api/v1/stops",
      method: "get",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        setStops(response.data);
        stops.sort(function(a, b) {
          return a.street > b.street;
        });
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast onClose={()=>setShowToast(false)} show={showToast} delay={7000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Shuttler</strong>
            <small>Important!</small>
          </Toast.Header>
          <Toast.Body>Keep in mind, that changes to stops apply immediately</Toast.Body>
        </Toast>
      </ToastContainer>
      <Modal show={showAddForm} onHide={handleCloseAddForm}>
        <form onSubmit={handleAddFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add a route</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label style={{ margin: "5px" }}>Type:</label>
            <Form.Control
              as="select"
              required="required"
              placeholder="Enter the type"
              name="type"
              onChange={handleAddFormChange}
            >
              <option value="bus">bus</option>
              <option value="trolleybus">trolleybus</option>
              <option value="tram">tram</option>
            </Form.Control>
            <br />
            <label style={{ margin: "5px" }}>Number:</label>
            <Form.Control
              type="number"
              required="required"
              placeholder="Enter the number"
              name="number"
              onChange={handleAddFormChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddForm}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleCloseAddForm}
            >
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
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
          <Button
            onClick={() => {
              handleShowAddForm();
            }}
          >
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
                      <EditableRowRoute
                        route={currRoute}
                        stops={stops}
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    );
                  } else {
                    return (
                      <ReadOnlyRowRoute
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
