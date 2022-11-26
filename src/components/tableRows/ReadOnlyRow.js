import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { MdDeleteOutline } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'

const ReadOnlyRow = ({ route, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{route.id}</td>
      <td>{route.type}</td>
      <td>{route.number}</td>
      <td>{JSON.stringify(route.stops)}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button
            type="button"
            onClick={(event) => handleEditClick(event, route)}
            variant="secondary"
          >
            <AiFillEdit />
          </Button>
          <Button
            type="button"
            onClick={() => handleDeleteClick(route.id)}
            variant="secondary"
            style={{backgroundColor:"red"}}
          >
            <MdDeleteOutline />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
