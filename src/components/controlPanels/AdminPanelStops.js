import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import EditableRow from "../tableRows/EditableRowStop";
import ReadOnlyRow from "../tableRows/ReadOnlyRowStop";
import {
  Spinner,
  Form,
  Modal,
  Table,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import { FormattedMessage } from "react-intl";

const PanelStops = () => {
  const [stops, setStops] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const [editStopId, setEditStopId] = useState(null);
  const [addFormData, setAddFormData] = useState({
    street: "",
    number: "",
  });
  const [editFormData, setEditFormData] = useState({
    street: "",
    number: "",
  });

  useEffect(() => {
    axios({
      url: "https://localhost:8443/api/v1/stops",
      method: "get",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        setStops(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditClick = (event, stop) => {
    event.preventDefault();
    setEditStopId(stop.id);

    const formValues = {
      street: stop.street,
      number: stop.number,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditStopId(null);
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

    const editedStop = {
      street: editFormData.street,
      number: editFormData.number,
    };

    axios({
      url: "https://localhost:8443/api/v1/admin/updateStop/" + editStopId,
      method: "put",
      data: {
        street: editedStop.street,
        number: editedStop.number,
      },
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        console.log(response.data);
        const newStops = [...stops];
        const index = stops.findIndex((stop) => stop.id === editStopId);
        newStops[index].street = editedStop.street;
        newStops[index].number = editedStop.number;
        setStops(newStops);
        setMessage("Stop id:" + editStopId + " has been changed");
        setShowToast(true);
        setEditStopId(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteClick = (stopId) => {
    axios({
      url: "https://localhost:8443/api/v1/admin/deleteStop/" + stopId,
      method: "delete",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        console.log(response.data);
        const newStops = [...stops];
        const index = stops.findIndex((stop) => stop.id === stopId);
        newStops.splice(index, 1);
        setStops(newStops);
        setMessage("Stop id:" + stopId + " has been deleted");
        setShowToast(true);
      })
      .catch((err) => {
        console.log(err);
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
      url: "https://localhost:8443/api/v1/admin/addStop",
      method: "post",
      data: {
        street: addFormData.street,
        number: addFormData.number,
      },
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        const newStop = {
          id: "",
          street: addFormData.street,
          number: addFormData.number,
        };
        const newStops = stops;
        setStops([...newStops, newStop]);
        console.log(response.data);
        setMessage("New stop has been created");
        setShowToast(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Shuttler</strong>
            <small>Action result</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Modal
        show={showAddForm}
        onHide={() => {
          setShowAddForm(false);
        }}
      >
        <form onSubmit={handleAddFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add a stop</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label style={{ margin: "5px" }}>Street:</label>
            <Form.Control
              required="required"
              placeholder="Enter the street name"
              name="street"
              onChange={handleAddFormChange}
            />
            <br />
            <label style={{ margin: "5px" }}>Number:</label>
            <Form.Control
              type="number"
              required="required"
              placeholder="Enter the number of the street"
              name="number"
              onChange={handleAddFormChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => setShowAddForm(false)}
            >
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <div className="organizer-header">
        <h3 style={{ color: "white" }}>
          <FormattedMessage id="stops" />
        </h3>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            onClick={() => {
              setShowAddForm(true);
            }}
          >
            <FormattedMessage id="add" /> <BiAddToQueue />
          </Button>
        </div>
      </div>
      {stops !== null ? (
        <form
          onSubmit={handleEditFormSubmit}
          style={{ margin: "0px 14% 150px 14%" }}
        >
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Id</th>
                <th>
                  <FormattedMessage id="street" />
                </th>
                <th>
                  <FormattedMessage id="number" />
                </th>
                <th>
                  <FormattedMessage id="actions" />
                </th>
              </tr>
            </thead>
            <tbody>
              {stops.map((stop) => {
                if (stop.id === editStopId) {
                  return (
                    <EditableRow
                      stop={stop}
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  );
                } else {
                  return (
                    <ReadOnlyRow
                      stop={stop}
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

export default PanelStops;
