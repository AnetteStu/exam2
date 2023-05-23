import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link, useLocation } from 'react-router-dom';

import { getProfile, logoutUser } from './tokenHandlers';
import { NavDropdown } from 'react-bootstrap';
import { Button } from '@mui/material';

import { BASE_URL, PROFILES, user } from '../constants/API';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [href, setHref] = useState("");
  const location = useLocation();
  useEffect(() => {
    setHref(window.location.pathname)
  },[location]) 
  getProfile(`${BASE_URL}${PROFILES}`)

  function handleLogoutClick() {
    if(window.confirm("Are you sure you want to log out?")) {
      logoutUser()
    }
  }

  return (
    <Navbar variant="light" expand="xl" className={href === "/" ? `customLandingNav` : `customNav`} >
      <Container expand="xl" className='customNavWidth'>
        <Link to="/" className="navbar-brand">Holidaze</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Link to="/" className="nav-link" tabIndex="0">Home</Link>
            <Link to="/venues" className="nav-link" tabIndex="0">Venues</Link>
            <Link to="/about" className="nav-link" tabIndex="0">About</Link>
            {user ?

            <NavDropdown title={user} id="basic-nav-dropdown">
              <li><Link to={"/profile/"}>Profile</Link></li>
              <li><Link to={"/bookings/"}>Bookings</Link></li>
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