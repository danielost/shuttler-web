import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import RoutesTableAll from "./RoutesTableAll";

function Compile() {
  const [routes, setRoutes] = useState(null);
  const [error, setError] = useState("");
  const [stops, setStops] = useState(null);
  const [fromId, setFromId] = useState(null);
  const [toId, setToId] = useState(null);

  const handleFromChange = (e) => {
    setFromId(e.target.value);
  };

  const handleToChange = (e) => {
    setToId(e.target.value);
  };

  useEffect(() => {
    axios({
      url: "https://localhost:8443/api/v1/stops",
      method: "get",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        setStops(response.data);
        setFromId(response.data[0].id);
        setToId(response.data[1].id);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCompileSubmit = async () => {
    setRoutes(null);
    setError("");
    console.log("From: " + fromId);
    console.log("To: " + toId);

    if (fromId === toId) {
      setError("Stops can't be the same");
    } else {
      axios({
        url:
          "https://localhost:8443/api/v1/routes/findRoutesByStops/" +
          fromId +
          "/" +
          toId,
        method: "get",
        headers: {
          Authorization: "Bearer_" + Cookies.get("_auth"),
        },
      })
        .then((response) => {
          setRoutes(response.data);
          console.log(response.data);
          if (response.data.length === 0) {
            setError("No routes coursing through these stops, sorry.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="compile-form-container">
      <form className="compile-form" style={{ alignItems: "center" }}>
        <h3 className="Auth-form-title">Compile routes</h3>
        {stops != null && stops.length > 2 ? (
          <>
            <label>From:</label>
            <Form.Select
              style={{ width: "80%" }}
              defaultValue={stops[0].id}
              onChange={(e) => handleFromChange(e)}
            >
              {stops.map((currStop) => {
                return (
                  <option value={currStop.id}>
                    {currStop.street} {currStop.number}
                  </option>
                );
              })}
            </Form.Select>
            <br />
            <label>To:</label>
            <Form.Select
              defaultValue={stops[1].id}
              style={{ width: "80%" }}
              onChange={(e) => handleToChange(e)}
            >
              {stops.map((currStop) => {
                return (
                  <option value={currStop.id}>
                    {currStop.street} {currStop.number}
                  </option>
                );
              })}
            </Form.Select>
            {error !== "" ? (
              <>
                <br />
                <label style={{ color: "red" }}>{error}</label>
              </>
            ) : (
              <></>
            )}
            <Button
              style={{ margin: "30px" }}
              variant="primary"
              onClick={() => {
                handleCompileSubmit();
              }}
            >
              Compile
            </Button>
            {routes !== null ? (
              <>
                {routes.length !== 0 ? (
                  <RoutesTableAll routes={routes} />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <Spinner />
        )}
      </form>
    </div>
  );
}

export default Compile;
