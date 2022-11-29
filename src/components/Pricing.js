import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import jam from "../imgs/jam.jpg";
import org from "../imgs/organizer.jpg";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useSignOut } from "react-auth-kit";
import { FormattedMessage } from "react-intl";

const Pricing = () => {
  const [showSub, setShowSub] = useState(false);
  const [showUnSub, setShowUnSub] = useState(false);
  const signOut = useSignOut();

  const userSubscriptions = JSON.parse(Cookies.get("_auth_state")).data
    .subscriptions;
  const userId = JSON.parse(Cookies.get("_auth_state")).data.id;

  const handleCloseSub = () => setShowSub(false);
  const handleShowSub = () => setShowSub(true);
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
          <Modal.Title>
            <FormattedMessage id="pricingmodalheader" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormattedMessage id="pricingmodalbody" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSub}>
            <FormattedMessage id="pricingmodalcancel" />
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              signOut();
            }}
          >
            <FormattedMessage id="pricingmodalok" />
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
          <Modal.Title>
            <FormattedMessage id="unsubmodalheader" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormattedMessage id="unsubmodalbody" />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              signOut();
            }}
          >
            <FormattedMessage id="logout" />
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="pricing-container">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={jam} />
          <Card.Body>
            <Card.Title>
              <FormattedMessage id="premmembership" />
            </Card.Title>
            <Card.Text>
              <FormattedMessage id="premdesc" />
            </Card.Text>
            {userSubscriptions.length !== 0 ? (
              <Button
                variant="secondary"
                onClick={() => {
                  handleSubscriptionDeleting();
                }}
              >
                <FormattedMessage id="cancelsub" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  handleSubscriptionBuying();
                }}
              >
                <FormattedMessage id="buysub" /> $4.99
              </Button>
            )}
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={org} />
          <Card.Body>
            <Card.Title>
              <FormattedMessage id="orgmembership" />
            </Card.Title>
            <Card.Text>
              <FormattedMessage id="orgdesc" />{" "}
            </Card.Text>
            <Button variant="primary">
              <FormattedMessage id="buysub" /> $24.99
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Pricing;
