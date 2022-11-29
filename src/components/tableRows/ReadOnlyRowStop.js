import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const ReadOnlyRow = ({ stop, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{stop.id}</td>
      <td>{stop.street}</td>
      <td>{stop.number}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button
            type="button"
            onClick={(event) => handleEditClick(event, stop)}
            variant="secondary"
          >
            <AiFillEdit />
          </Button>
          <Button
            type="button"
            onClick={() => handleDeleteClick(stop.id)}
            variant="secondary"
            style={{ backgroundColor: "red" }}
          >
            <MdDeleteOutline />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
