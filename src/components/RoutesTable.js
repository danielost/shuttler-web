import React from 'react';
import Table from 'react-bootstrap/Table';

const RoutesTable = ({routes, rType}) => {
    const estimateCongestion = (cong) => {
        const strCong = cong.toString().slice(0,5);
        if (cong < 30) {
          return (<td style={{color: "green"}}>
            {strCong}%
            </td>)
        } else if (cong < 60) {
          return (<td style={{color: "#ffbe00"}}>
            {strCong}%
            </td>)
        } else {
          return (<td style={{color: "red"}}>
            {strCong}%
        </td>)
        }
      };

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Number</th>
          <th>Congestion</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <>        
        {
            routes.map (currRoute => {
                if (currRoute.type === rType)
                    return (
                        <tr>
                            <td>{currRoute.number}</td>
                            {estimateCongestion(currRoute.congestion)}
                            <td>Details</td>
                        </tr>
                    )
                return <span></span>
            })
        }
        </>

      </tbody>
    </Table>
  );
}

export default RoutesTable;