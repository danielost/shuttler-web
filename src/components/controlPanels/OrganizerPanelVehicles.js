import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BiAddToQueue } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { Spinner } from "react-bootstrap";
import ReadOnlyRow from "../tableRows/ReadOnlyRowVehicle";
import EditableRow from "../tableRows/EditableRowVehicle";

const OrganizerPanelVehicles = () => {
  const [vehicles, setVehicles] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [addFormData, setAddFormData] = useState({
    vin: "",
    maxCapacity: "",
    route: "",
  });
  const [editFormData, setEditFormData] = useState({
    route: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const userId = JSON.parse(Cookies.get("_auth_state")).data.id;
  const handleCloseAddForm = () => setShowAddForm(false);
  const handleShowAddForm = () => setShowAddForm(true);
  const [editVehicleId, setEditVehicleId] = useState(null);

  useEffect(() => {
    axios({
      url: "https://localhost:8443/api/v1/routes",
      method: "get",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        setRoutes(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios({
      url: "https://localhost:8443/api/v1/organizer/getVehicles/" + userId,
      method: "get",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        setVehicles(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditClick = (event, vehicle) => {
    event.preventDefault();
    setEditVehicleId(vehicle.vin);

    const formValues = {
      vin: vehicle.vin,
      route: vehicle.route,
    };

    setEditFormData(formValues);
  };

  const handleDeleteClick = (vehicleVin) => {
    axios({
      url:
        "https://localhost:8443/api/v1/organizer/deleteVehicle/" + vehicleVin,
      method: "delete",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        // setMessage("Vehicle deleted");
        // handleShow();
        console.log(response.data);
      })
      .catch((err) => {
        // setMessage(err);
        // handleShow();
        console.log(err);
      });
    const newVehicles = [...vehicles];

    const index = vehicles.findIndex((vehicle) => vehicle.vin === vehicleVin);

    newVehicles.splice(index, 1);

    setVehicles(newVehicles);
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    console.log(fieldName + ": " + fieldValue);

    console.log(addFormData);

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleCancelClick = () => {
    setEditVehicleId(null);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    console.log(addFormData);

    const routeId = routes.find((route) => route.number === addFormData.route)
      .id;

    axios({
      url:
        "https://localhost:8443/api/v1/organizer/addVehicle/" +
        routeId +
        "?userId=" +
        userId,
      method: "post",
      data: {
        vin: addFormData.vin,
        maxCapacity: addFormData.maxCapacity,
        currentCapacity: addFormData.currentCapacity,
      },
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        const newVehicles = [...vehicles];

        const newVehicle = {
          vin: addFormData.vin,
          route: { number: addFormData.route },
          maxCapacity: addFormData.maxCapacity,
          currentCapacity: "0",
        };

        setVehicles([...newVehicles, newVehicle]);
        setEditVehicleId(null);
        setShowAddForm(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

    const currentVehicle = vehicles.find(
      (vehicle) => vehicle.vin === editVehicleId
    );

    const editedVehicle = {
      route: routes.find((currRoute) => editFormData.route === currRoute.number)
        .id,
      maxCapacity: currentVehicle.maxCapacity,
      currentCapacity: currentVehicle.currentCapacity,
    };

    // console.log("Data:");
    // console.log("Route_id: " + editedVehicle.route);
    // console.log("vin: " + editVehicleId);
    // console.log("maxCapacity: " + editedVehicle.maxCapacity);
    // console.log("currentCapacity: " + editedVehicle.currentCapacity);

    axios({
      url:
        "https://localhost:8443/api/v1/organizer/updateVehicle?vin=" +
        editVehicleId +
        "&route_id=" +
        editedVehicle.route,
      method: "put",
      data: {
        vin: editVehicleId,
        maxCapacity: editedVehicle.maxCapacity,
        currentCapacity: editedVehicle.currentCapacity,
      },
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        console.log(response.data);
        const newVehicles = [...vehicles];

        const index = vehicles.findIndex(
          (vehicle) => vehicle.vin === editVehicleId
        );

        newVehicles[index].route.number = editFormData.route;

        setVehicles(newVehicles);
        setEditVehicleId(null);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <>
      <Modal show={showAddForm} onHide={handleCloseAddForm}>
        <form onSubmit={handleAddFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add a vehicle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label style={{ margin: "5px" }}>VIN:</label>
            <Form.Control
              required="required"
              placeholder="Enter the VIN code"
              name="vin"
              onChange={handleAddFormChange}
            />
            <br />
            <label style={{ margin: "5px" }}>Maximum capacity:</label>
            <Form.Control
              type="number"
              required="required"
              placeholder="Enter the maximum capacity"
              defaultValue={1}
              min="1"
              name="maxCapacity"
              onChange={handleAddFormChange}
            />
            <br />
            <label style={{ margin: "5px" }}>Route number:</label>
            {routes !== null ? (
              <Form.Control
                as="select"
                // type="number"
                required="required"
                placeholder="Enter the route"
                name="route"
                onChange={handleAddFormChange}
              >
                {routes.map((route) => {
                  return <option>{route.number}</option>;
                })}
              </Form.Control>
            ) : (
              <></>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddForm}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleAddFormSubmit}
            >
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <div className="organizer-header">
        <h3 style={{ color: "white" }}>Your vehicles</h3>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            onClick={() => {
              handleShowAddForm();
            }}
          >
            Add <BiAddToQueue />
          </Button>
        </div>
      </div>
      {vehicles !== null ? (
        <form
          onSubmit={handleEditFormSubmit}
          style={{ margin: "0px 14% 150px 14%" }}
        >
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>VIN</th>
                <th>Route</th>
                <th>Maximum capacity</th>
                <th>Current capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => {
                if (vehicle.vin === editVehicleId) {
                  return (
                    <EditableRow
                      routes={routes}
                      vehicle={vehicle}
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  );
                } else {
                  return (
                    <ReadOnlyRow
                      vehicle={vehicle}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  );
                }
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

export default OrganizerPanelVehicles;
