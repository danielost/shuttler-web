import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Cookies from "js-cookie";
import { RequireAuth, useSignOut } from "react-auth-kit";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Pricing from "./Pricing";
import Login from "./Login";
import AllRoutes from "./AllRoutes";
import Register from "./Register";
import Profile from "./Profile";
import Compile from "./CompileRoute";
import SavedRoutes from "./SavedRoutes";
import OrganizerPanelRoutes from "./controlPanels/OrganizerPanelRoutes";
import OrganizerPanelVehicles from "./controlPanels/OrganizerPanelVehicles";
import NotFoundPage from "./NotFound";
import PanelUsers from "./controlPanels/AdminPanelUsers";
import PanelStops from "./controlPanels/AdminPanelStops";
import { FormattedMessage } from "react-intl";

const NavbarComp = () => {
  const [name, setName] = useState("");
  const [roles, setRoles] = useState([]);
  const signOut = useSignOut();

  useEffect(() => {
    let userData = Cookies.get("_auth_state");
    if (userData != null) {
      setName(JSON.parse(userData).data.username);
      setRoles(JSON.parse(userData).data.roles);
    }
  }, []);

  return (
    <div>
      <Navbar collapseOnSelect="true" bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            Shuttler
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"}>
                <FormattedMessage id="home" />
              </Nav.Link>
              <Nav.Link as={Link} to={"/pricing"}>
                <FormattedMessage id="pricing" />
              </Nav.Link>
              <NavDropdown
                title={<FormattedMessage id="routes" />}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to={"/compile"}>
                  <FormattedMessage id="compile" />
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/favorites"}>
                  <FormattedMessage id="favorites" />
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={"/allRoutes"}>
                  <FormattedMessage id="seeall" />
                </NavDropdown.Item>
              </NavDropdown>
              {Cookies.get("_auth") != null &&
              roles.find((role) => role.name === "ROLE_ORGANIZER") !==
                undefined ? (
                <NavDropdown
                  title={<FormattedMessage id="orgpanel" />}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to={"/manageRoutes"}>
                    <FormattedMessage id="mngroutes" />
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/manageVehicles"}>
                    <FormattedMessage id="mngvehicles" />
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <></>
              )}
              {Cookies.get("_auth") != null &&
              roles.find((role) => role.name === "ROLE_ADMIN") !== undefined ? (
                <NavDropdown
                  title={<FormattedMessage id="admpanel" />}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to={"/manageUsers"}>
                    <FormattedMessage id="mngusers" />
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/manageStops"}>
                    <FormattedMessage id="mngstops" />
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/#"}>
                    <FormattedMessage id="mngdatabase" />
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <></>
              )}
            </Nav>
            <Nav>
              {Cookies.get("_auth") != null ? (
                <>
                  <Nav.Link as={Link} to={"/profile"}>
                    <FormattedMessage id="loggedinas" />{" "}
                    <span style={{ color: "#3B71CA" }}>{name}</span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      signOut();
                      window.location.reload(false);
                    }}
                    className="btn btn-primary"
                    as={Link}
                    to={"/"}
                  >
                    <FormattedMessage id="logout" />
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to={"/signup"}>
                    <FormattedMessage id="signup" />
                  </Nav.Link>
                  <Nav.Link
                    className="btn btn-primary"
                    as={Link}
                    to={"/signin"}
                  >
                    <FormattedMessage id="signin" />
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pricing"
            element={
              <RequireAuth loginPath="/signin">
                <Pricing />
              </RequireAuth>
            }
          />
          <Route
            path="/allRoutes"
            element={
              <RequireAuth loginPath="/signin">
                <AllRoutes />
              </RequireAuth>
            }
          />
          <Route
            path="/favorites"
            element={
              <RequireAuth loginPath="/signin">
                <SavedRoutes />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth loginPath="/signin">
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/compile"
            element={
              <RequireAuth loginPath="/signin">
                <Compile />
              </RequireAuth>
            }
          />
          <Route
            path="/manageRoutes"
            element={
              <RequireAuth loginPath="/signin">
                <OrganizerPanelRoutes />
              </RequireAuth>
            }
          />
          <Route
            path="/manageUsers"
            element={
              <RequireAuth loginPath="/signin">
                <PanelUsers />
              </RequireAuth>
            }
          />
          <Route
            path="/manageStops"
            element={
              <RequireAuth loginPath="/signin">
                <PanelStops />
              </RequireAuth>
            }
          />
          <Route
            path="/manageVehicles"
            element={
              <RequireAuth loginPath="/signin">
                <OrganizerPanelVehicles />
              </RequireAuth>
            }
          />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default NavbarComp;
