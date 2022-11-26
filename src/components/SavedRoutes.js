import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import RoutesTableAll from "./RoutesTableAll";
import { Link } from "react-router-dom";

const SavedRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const userId = JSON.parse(Cookies.get("_auth_state")).data.id;

  useEffect(() => {
    axios({
      url: "https://localhost:8443/api/v1/users/" + userId + "/savedRoutes",
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
        {routes.length !== 0 ? (
          <>
            <h3 className="Auth-form-title">Favorite routes</h3>
            <RoutesTableAll routes={routes} />
          </>
        ) : (
          <label
            style={{ fontSize: "20px", margin: "100px", textDecoration: "0" }}
          >
            No favorite routes, go to{" "}
            <Link style={{ textDecoration: "none" }} to="/allRoutes">
              all routes
            </Link>{" "}
            to save some.
          </label>
        )}
      </div>
    </div>
  );
};

export default SavedRoutes;
