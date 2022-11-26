import React from "react";
import Table from "react-bootstrap/Table";

const StopsTable = ({ stops }) => {
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Street</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <>
            {stops.map((currStop) => {
              return (
                <tr>
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
