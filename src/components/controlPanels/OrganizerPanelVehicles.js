import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BiAddToQueue } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { Spinner } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";

const OrganizerPanelVehicles = () => {
  const [vehicles, setVehicles] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [addFormData, setAddFormData] = useState({
    vin: "",
    maxCapacity: "",
    route: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const userId = JSON.parse(Cookies.get("_auth_state")).data.id;
  const handleCloseAddForm = () => setShowAddForm(false);
  const handleShowAddForm = () => setShowAddForm(true);

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

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    console.log(addFormData);

    const routeId = routes.find(route=>route.number==addFormData.route).id;

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
        // axios({
        //   url:
        //     "https://localhost:8443/api/v1/routes/getByNumber?number=" +
        //     addFormData.number,
        //   method: "get",
        //   headers: {
        //     Authorization: "Bearer_" + Cookies.get("_auth"),
        //   },
        // })
        //   .then((responseSec) => {
        //     setMessage("Route added");
        //     handleShow();
        //     console.log(responseSec.data);

        //     const newRoutes = [...routes, responseSec.data];
        //     setRoutes(newRoutes);
        //   })
        //   .catch((err) => {
        //     setMessage(err);
        //     handleShow();
        //     console.log(err);
        //   });
        console.log("Adding...");
        console.log(response.data);
      })
      .catch((err) => {
        // setMessage(err);
        // handleShow();
        console.log(err);
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
          // onSubmit={handleEditFormSubmit}
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
                return (
                  <tr>
                    <td>{vehicle.vin}</td>
                    <td>{vehicle.route.number}</td>
                    <td>{vehicle.maxCapacity}</td>
                    <td>{vehicle.currentCapacity}</td>
                    <td>
                      <Button
                        type="button"
                        // onClick={() => handleDeleteClick(route.id)}
                        variant="secondary"
                        style={{ backgroundColor: "red" }}
                      >
                        <MdDeleteOutline />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </form>
      ) : (
        <Spinner style={{ color: "white" }} />
      )}
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
