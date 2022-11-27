import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { GrCheckmark } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const EditableRow = ({
  stops,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
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
                    <Form.Check
                      name="onsite"
                      type="switch"
                      id="custom-switch"
                      // checked="false"
                    />
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
