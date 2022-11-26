import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import jam from "../imgs/jam.jpg"
import org from "../imgs/organizer.jpg"
import Cookies from "js-cookie";

const Pricing = () => {
  const userSubscriptions = JSON.parse(Cookies.get("_auth_state")).data
    .subscriptions;

  return (
    <div className="pricing-container">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={jam} />
        <Card.Body>
          <Card.Title>Premium membership</Card.Title>
          <Card.Text>
            Get an ability to see routes' congestion and find optimal routes
            anytime
          </Card.Text>
          {userSubscriptions.length !== 0 ? (
            <Button variant="secondary">Cancel subscription</Button>
          ) : (
            <Button variant="primary">Buy now for $4.99</Button>
          )}
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem"}}>
        <Card.Img variant="top" src={org} />
        <Card.Body>
          <Card.Title>Organizer membership</Card.Title>
          <Card.Text>
            Become an organizer: create routes, vehicles and attract more
            clients to your transport organization
          </Card.Text>
          <Button variant="primary">Buy now for $24.99</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Pricing;
