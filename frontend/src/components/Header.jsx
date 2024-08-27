import { Button, Image, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/userApiSlice';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCredentials } from '../slices/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
      dispatch(deleteCredentials());
      toast.success(res.message);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error.message);
      toast.error(error.message);
    }
  };

  const linkClass = ({ isActive }) =>
    isActive ? "bg-primary text-white rounded px-3 py-2 text-decoration-none" : "text-white rounded-md px-3 py-2 text-decoration-none";

  return (
    <>
      <Navbar expand="md" bg="dark" variant="dark" className="fw-bold" collapseOnSelect>
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="pt-3">
            <Image src="logo2.png" className="logo" alt="Logo" /> DynamiK Training
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto mt-3">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              {userInfo ? (
                <>
                  <NavLink to="/profile" className={linkClass}>
                    My Profile
                  </NavLink>
                  <NavLink to="/Modules" className={linkClass}>
                    Modules
                  </NavLink>
                  {/* Admin Dropdown */}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown 
                    title='Admin' 
                    id='adminmenu' 
                    menuVariant="dark"
                    className='fw-bold text-white text-decoration-none '
                    >
                      <NavDropdown.Item as={Link} to='/admin/module'>
                        Modules
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to='/admin/users'>
                        Users
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                  <Nav.Item>
                    <Button className="bg-transparent border-0 text-white fw-bold" onClick={handleLogout}>
                      Log Out
                    </Button>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <NavLink to="/register" className={linkClass}>
                    Sign Up
                  </NavLink>
                  <NavLink to="/login" className={linkClass}>
                    Sign In
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {logoutLoading && <Loader />}
    </>
  );
}

export default Header;
