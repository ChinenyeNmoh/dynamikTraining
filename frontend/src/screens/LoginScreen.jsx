import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../slices/userApiSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import FormContainer from "../components/FormContainer"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';


const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';
  const message = searchParams.get('message');
  const error = searchParams.get('error');




  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  
  useEffect(() => {
    if (message) {
      toast.info(message);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);



  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      toast.success(res.message);
      dispatch(setCredentials(res?.user));
      navigate(redirect);
      
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'An error occurred during login');
    }
  };

  

  return (
    <>
      {(isLoginLoading ) && <Loader />}
      <FormContainer>
        <h2 className="text-center mt-3">Sign In</h2>
        <Form className="m-3" onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label className='fw-bold'>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label className='fw-bold'>Password</Form.Label>
            <div className='position-relative'>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
                 <Button
        className='position-absolute bg-transparent border-0 p-0'
        style={{
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          zIndex: 2,
        }}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <FaEye className='text-black' />
        ) : (
          <FaEyeSlash className='text-black' />
        )}
      </Button>

            </div>
            
          </Form.Group>

          <Button
            disabled={isLoginLoading}
            type="submit"
            variant="primary"
            className="d-block me-auto ms-auto mt-4"
          >
            Sign In
          </Button>
          
        </Form>

        <Row className="py-3 m-3 ">
          <Col md={6}>
            New Customer?{' '}
            <Link to="/register">
              Register
            </Link>
          </Col>

          <Col md={6}>
            <Link to="/forgotpassword" className="text-muted">
              Forgot password?
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;