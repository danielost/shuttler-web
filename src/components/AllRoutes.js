import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/Accordion";
import RoutesTable from "./RoutesTable";

const AllRoutes = () => {
  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    axios({
      url: "https://localhost:8443/api/v1/routes",
      method: "get",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        setRoutes(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="route-container">
      <div className="route-container-items">
        {routes != null ? (
          <>
            <h3 className="Auth-form-title">All routes</h3>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Bus</Accordion.Header>
                <Accordion.Body style={{padding:"0"}}>
                  <RoutesTable routes={routes} rType={"bus"} />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Trolleybus</Accordion.Header>
                <Accordion.Body style={{padding:"0"}}>
                  <RoutesTable routes={routes} rType={"trolleybus"} />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Tram</Accordion.Header>
                <Accordion.Body style={{padding:"0"}}>
                  <RoutesTable routes={routes} rType={"tram"} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
        ) : (
          <Spinner style={{ margin: "auto" }} />
        )}
      </div>
    </div>
  );
};

export default AllRoutes;
