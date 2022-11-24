import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function RouteInfo(route) {
    const data = route.route;
    let routeType = data.type;

    const estimateCongestion = () => {
      let cong = Number(data.congestion);
      if (cong < 30) {
        return (<Card.Title>
          Low congestion
        </Card.Title>)
      } else if (cong < 60) {
        return (<Card.Title style={{color: "#ffbe00"}}>
          Moderate congestion
        </Card.Title>)
      } else {
        return (<Card.Title style={{color: "red"}}>
          High congestion
        </Card.Title>)
      }
    };

  return (
    <Card>
      <Card.Header as="h5">{routeType.charAt(0).toUpperCase() + routeType.slice(1)} {data.number}</Card.Header>
      <Card.Body>
      <Card.Title>
        {estimateCongestion()}
      </Card.Title>
        <Card.Text>
          {data.congestion.toString().slice(0, 5)}%
        </Card.Text>
        <Button variant="primary">Details</Button>
      </Card.Body>
    </Card>
  );
}

export default RouteInfo;