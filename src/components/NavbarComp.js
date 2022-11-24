import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';
import { RequireAuth, useSignOut } from "react-auth-kit";
import {
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Home from "./Home"
import Pricing from "./Pricing"
import Login from "./Login"
import AllRoutes from "./AllRoutes"
import Register from "./Register"
import Profile from "./Profile"

const NavbarComp = () => {
    const [name, setName] = useState("");
    const signOut = useSignOut();

    useEffect(() => {
        let userData = Cookies.get("_auth_state");
        if (userData != null) {
            setName(JSON.parse(userData).username);
        }
    }, [])
    
    return ( 
        <div>
            <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to={"/"}>Shuttler</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                        <Nav.Link as={Link} to={"/pricing"}>Pricing</Nav.Link>
                        <NavDropdown title="Routes" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#bus">Bus</NavDropdown.Item>
                        <NavDropdown.Item href="#trolleybus">Trolleybus</NavDropdown.Item>
                        <NavDropdown.Item href="#tram">Tram</NavDropdown.Item>

                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to={"/allRoutes"}>
                            See all
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {Cookies.get('_auth') != null ? (
                            <>
                                <Nav.Link as={Link} to={"/profile"}>Logged in as <span style={{color: "#3B71CA"}}>{name}</span></Nav.Link>
                                <Nav.Link onClick={() => {signOut(); window.location.reload(false)}} className='btn btn-primary' as={Link} to={"/"}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to={"/signup"}>Sign up</Nav.Link>
                                <Nav.Link className='btn btn-primary' as={Link} to={"/signin"}>Sign in</Nav.Link>
                            </>
                        )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    
                        <Route path="/pricing" element={
                            <RequireAuth loginPath="/signin">
                                <Pricing/>
                            </RequireAuth>
                        } />
                        <Route path="/allRoutes" element={
                            <RequireAuth loginPath="/signin">
                                <AllRoutes/>
                            </RequireAuth>
                        } />
                        <Route path="/profile" element={
                            <RequireAuth loginPath="/signin">
                                <Profile/>
                            </RequireAuth>
                        } />
                    <Route path="/signin" element={<Login/>} />
                    <Route path="/signup" element={<Register/>} />
                </Routes>
            </div>
        </div>
    );
    
}

export default NavbarComp;