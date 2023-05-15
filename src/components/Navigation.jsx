import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link, useLocation } from 'react-router-dom';

import { getProfile } from './tokenHandlers';
import { NavDropdown } from 'react-bootstrap';
import logoutUser from './logout';
import { Button } from '@mui/material';

import { BASE_URL, PROFILES, user } from '../constants/API';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [href, setHref] = useState("");
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    setHref(window.location.pathname)
  },[location]) 
  getProfile(`${BASE_URL}${PROFILES}`)

  function handleLogoutClick() {
    if(window.confirm("Are you sure you want to log?")) {
      logoutUser()
    }
  }

  return (
    <Navbar  variant="light" expand="lg" className={href === "/" ? `customLandingNav` : `customNav`} >
      <Container className={``}>
        <Link to="/" className="navbar-brand">Holidaze</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Link to="/" className="nav-link" tabIndex="0">Home</Link>
            <Link to="/venues" className="nav-link" tabIndex="0">Venues</Link>
            <Link to="/about" className="nav-link" tabIndex="0">About</Link>
            {/* <Link to="/contact" className="nav-link" tabIndex="0">Contact</Link> */}
            {user ?

            <NavDropdown title={user} id="basic-nav-dropdown">
              {/* <NavDropdown.Item to={"/profile/"+ isLoggedIn}>Profile</NavDropdown.Item>
              <NavDropdown.Item to="/logout">Logout</NavDropdown.Item> */}
              <li><Link to={"/profile/"}>Profile</Link></li>
              <li><Link to={"/bookings/"}>Bookings</Link></li>
              {/* <button onClick={logoutUser}>Logout</button> */}
              <div className="center">
                <Button 
                  size="small"
                  variant="contained" 
                  className="defaultButton"
                  id="defaultButton"
                  onClick={handleLogoutClick}
                  >
                  Log out
                </Button>
              </div>
            </NavDropdown>
            : 
            <Link to="/login" className="nav-link" tabIndex="0">Login</Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  )
}