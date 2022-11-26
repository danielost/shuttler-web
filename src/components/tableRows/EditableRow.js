import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { GrCheckmark } from 'react-icons/gr'
import { ImCancelCircle } from 'react-icons/im'

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>{editFormData.id}</td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter the type"
          name="type"
          value={editFormData.type}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Enter the number"
          name="number"
          value={editFormData.number}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        Stops...
        {/* <input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input> */}
      </td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button
            type="submit"
            // onClick={(event) => handleEditClick(event, route)}
            variant="secondary"
          >
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
        {/* <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button> */}
      </td>
    </tr>
  );
};

export default EditableRow;
