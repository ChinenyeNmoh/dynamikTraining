import { Container, Image } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);
  const linkClass = ({ isActive }) =>
    isActive ? "bg-primary text-white rounded px-3 py-2 text-decoration-none" : "text-white rounded-md px-3 py-2 text-decoration-none";

  return (
    <Navbar 
    expand="md" 
    bg='dark' 
    variant='dark'
    className="fw-bold" 
    collapseOnSelect>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className='pt-3'>
          <Image src="logo2.png" className="logo" alt="Logo" /> DynamiK Training
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto mt-3">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            {isLoggedIn ? (
                <>
                 <NavLink to="/all" className={linkClass}>
                 Profile
                </NavLink>
                <NavLink to="/create" className={linkClass}>
                  Log Out
                </NavLink>
                </>
            ) : (
                <>
                 <NavLink to="/all" className={linkClass}>
                 Sign Up
                </NavLink>
                <NavLink to="/create" className={linkClass}>
                  Sign In
                </NavLink>
                </>
            )}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
