import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import jam from "../imgs/jam.jpg";
import org from "../imgs/organizer.jpg";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useSignOut } from "react-auth-kit";

const Pricing = () => {
  const [showSub, setShowSub] = useState(false);
  const [showUnSub, setShowUnSub] = useState(false);
  const signOut = useSignOut();

  const userSubscriptions = JSON.parse(Cookies.get("_auth_state")).data
    .subscriptions;
  const userId = JSON.parse(Cookies.get("_auth_state")).data.id;

  const handleCloseSub = () => setShowSub(false);
  const handleShowSub = () => setShowSub(true);
  const handleCloseUnSub = () => setShowUnSub(false);
  const handleShowUnSub = () => setShowUnSub(true);

  const handleSubscriptionBuying = () => {
    axios({
      url: "https://localhost:8443/api/v1/users/" + userId + "/subscribe",
      method: "put",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then(() => {
        handleShowSub();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubscriptionDeleting = () => {
    axios({
      url: "https://localhost:8443/api/v1/users/" + userId + "/unsubscribe",
      method: "put",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then(() => {
        handleShowUnSub();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal show={showSub} onHide={handleCloseSub}>
        <Modal.Header closeButton>
          <Modal.Title>Woohoo, you're now a premium member!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please re-login to your account to activate your subscription
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSub}>
            I'll do it later
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              signOut();
            }}
          >
            Re-login now
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showUnSub}
        onHide={() => {
          signOut();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sorry to see you leaving</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have to re-login to your account to deactivate your subscription
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
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
              <Button
                variant="secondary"
                onClick={() => {
                  handleSubscriptionDeleting();
                }}
              >
                Cancel subscription
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  handleSubscriptionBuying();
                }}
              >
                Buy now for $4.99
              </Button>
            )}
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
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
    </>
  );
};

export default Pricing;
