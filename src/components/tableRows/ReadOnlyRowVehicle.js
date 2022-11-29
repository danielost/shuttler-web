import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Button from "react-bootstrap/Button";

const ReadOnlyRow = ({ vehicle, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{vehicle.vin}</td>
      <td>{vehicle.route.number}</td>
      <td>{vehicle.maxCapacity}</td>
      <td>{vehicle.currentCapacity}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button
            type="button"
            onClick={(event) => handleEditClick(event, vehicle)}
            variant="secondary"
          >
            <AiFillEdit />
          </Button>
          <Button
            type="button"
            onClick={() => handleDeleteClick(vehicle.vin)}
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
