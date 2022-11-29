import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { GrCheckmark } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import Form from "react-bootstrap/Form";

const EditableRow = ({
  vehicle,
  routes,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>{vehicle.vin}</td>
      <td>
        <Form.Control
          as="select"
          required="required"
          placeholder="Enter the type"
          name="route"
          value={editFormData.type}
          onChange={handleEditFormChange}
        >
          {routes.map((route) => {
            return <option>{route.number}</option>;
          })}
        </Form.Control>
      </td>
      <td>{vehicle.maxCapacity}</td>
      <td>{vehicle.currentCapacity}</td>
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
