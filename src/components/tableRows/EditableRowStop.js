import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { GrCheckmark } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import Form from "react-bootstrap/Form";

const EditableRow = ({
  stop,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>{stop.id}</td>
      <td>
        <Form.Control
          required="required"
          placeholder="Enter the street"
          name="street"
          value={editFormData.street}
          onChange={handleEditFormChange}
        />
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
