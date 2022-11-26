import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Table from "react-bootstrap/Table";
import { Spinner } from "react-bootstrap";
import EditableRow from "./tableRows/EditableRow";
import ReadOnlyRow from "./tableRows/ReadOnlyRow";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BiAddToQueue } from "react-icons/bi";

const OrganizerPanelRoutes = () => {
  const [routes, setRoutes] = useState(null);
  const [addFormData, setAddFormData] = useState({
    number: "",
    type: "",
  });
  const [editFormData, setEditFormData] = useState({
    number: "",
    type: "",
  });

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
    console.log(editFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedRoute = {
      id: editRouteId,
      type: editFormData.type,
      number: editFormData.number,
    };

    const newRoutes = [...routes];

    const index = routes.findIndex((route) => route.id === editRouteId);

    newRoutes[index].type = editedRoute.type;
    newRoutes[index].number = editedRoute.number;

    setRoutes(newRoutes);
    setEditRouteId(null);
  };

  const handleEditClick = (event, route) => {
    event.preventDefault();
    setEditRouteId(route.id);

    const formValues = {
      type: route.type,
      number: route.number,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditRouteId(null);
  };

  const handleDeleteClick = (routeId) => {
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
        <form onSubmit={handleEditFormSubmit}>
          <Table striped bordered hover variant="dark">
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
                // if (
                //   currRoute.number.toString().indexOf(currNumber) !== -1 ||
                //   currNumber === ""
                // ) {
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
                // }
              })}
            </tbody>
          </Table>
        </form>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default OrganizerPanelRoutes;
