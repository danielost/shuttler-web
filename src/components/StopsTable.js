import React from "react";
import Table from "react-bootstrap/Table";

const StopsTable = ({ stops }) => {
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Street</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <>
            {stops.map((currStop) => {
              return (
                <tr>
                  <td>{currStop.id}</td>
                  <td>{currStop.street}</td>
                  <td>{currStop.number}</td>
                </tr>
              );
            })}
          </>
        </tbody>
      </Table>
    </>
  );
};

export default StopsTable;
