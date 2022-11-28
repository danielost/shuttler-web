import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { GrCheckmark } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Cookies from "js-cookie";

const EditableRow = ({
  route,
  stops,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  const routesStops = route.stops;

  function contains(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id === val) return true;
    }
    return false;
  }

  const handleStop = (stop, event) => {
    if (event.target.checked) {
      axios({
        url:
          "https://localhost:8443/api/v1/organizer/saveStop/" +
          stop.id +
          "/toRoute/" +
          route.id,
        method: "put",
        headers: {
          Authorization: "Bearer_" + Cookies.get("_auth"),
        },
      })
        .then((response) => {
          route.stops.push(stop);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios({
        url:
          "https://localhost:8443/api/v1/organizer/removeStop/" +
          stop.id +
          "/fromRoute/" +
          route.id,
        method: "put",
        headers: {
          Authorization: "Bearer_" + Cookies.get("_auth"),
        },
      })
        .then((response) => {
          route.stops.splice(
            route.stops.findIndex((currStop) => currStop.id === stop.id),
            1
          );
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <tr>
      <td>{editFormData.id}</td>
      <td>
        <Form.Control
          as="select"
          required="required"
          placeholder="Enter the type"
          name="type"
          value={editFormData.type}
          onChange={handleEditFormChange}
        >
          <option value="bus">bus</option>
          <option value="trolleybus">trolleybus</option>
          <option value="tram">tram</option>
        </Form.Control>
      </td>
      <td>
        <Form.Control
          type="number"
          required="required"
          placeholder="Enter the number"
          name="number"
          value={editFormData.number}
          onChange={handleEditFormChange}
        />
      </td>
      <td style={{ padding: "0px" }}>
        <Table striped bordered hover variant="light" style={{ margin: "0px" }}>
          <thead>
            <tr>
              <th>Street</th>
              <th>Number</th>
              <th>On the site</th>
            </tr>
          </thead>
          <tbody>
            {stops.map((stop) => {
              return (
                <tr>
                  <td>{stop.street}</td>
                  <td>{stop.number}</td>
                  <td>
                    {contains(routesStops, stop.id) ? (
                      <Form.Check
                        name="onsite"
                        type="switch"
                        id="custom-switch"
                        defaultChecked
                        onChange={(e) => handleStop(stop, e)}
                      />
                    ) : (
                      <Form.Check
                        name="onsite"
                        type="switch"
                        id="custom-switch"
                        onChange={(e) => handleStop(stop, e)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button type="submit" variant="secondary">
            <GrCheckmark />
          </Button>
          <Button
            type="button"
            onClick={handleCancelClick}
            variant="secondary"
            style={{ backgroundColor: "red" }}
          >
            <ImCancelCircle />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default EditableRow;
