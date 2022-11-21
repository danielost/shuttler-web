import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Home from "./Home"
import Pricing from "./Pricing"
import Login from "./Login"
import AllRoutes from "./AllRoutes"
import Register from "./Register"

export default class NavbarComp extends Component {
    render() { 
        return ( 
            <BrowserRouter>
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
                                <Nav.Link as={Link} to={"/signup"}>Sign up</Nav.Link>
                                <Nav.Link className='btn btn-primary' as={Link} to={"/signin"}>Sign in</Nav.Link>
                            </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    <div>
                        <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="/pricing" element={<Pricing/>} />
                            <Route path="/allRoutes" element={<AllRoutes/>} />
                            <Route path="/signin" element={<Login/>} />
                            <Route path="/signup" element={<Register/>} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}