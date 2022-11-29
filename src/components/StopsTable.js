import React from "react";
import Table from "react-bootstrap/Table";
import { FormattedMessage } from "react-intl";

const StopsTable = ({ stops }) => {
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>
              <FormattedMessage id="street" />
            </th>
            <th>
              <FormattedMessage id="number" />
            </th>
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
