import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation, useGetCaptchaEnvQuery } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const recaptchaRef = useRef(null);

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { data: captchaEnv, isLoading: captchaLoading } = useGetCaptchaEnvQuery();
  
  // Ensure captchaEnv is loaded before using it
  const siteKey = captchaEnv?.clientId || ''; // Replace `clientId` with the actual property name
 
  

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const handleCaptcha = (value) => {
    setCaptchaValue(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
      try {
        const res = await register({ 
          name, 
          email, 
          password,
          confirmPassword, 
          captchaValue
        }).unwrap();
        toast.success(res.message);
        navigate(redirect);
      } catch (err) {
        console.error(err.message);
        toast.error(err?.data?.message || err.error);
      }
  };

  return (
    <FormContainer>
      {isLoading && <Loader />}
      <h1 className="text-center mt-3">Register</h1>
      <Form className="m-3" onSubmit={submitHandler}>
       
        <Row>
          <Col md={6} sm={12}>
            <Form.Group className='my-2' controlId='firstname'>
              <Form.Label className='fw-bold'>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter full name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className='my-2' controlId='email'>
              <Form.Label className='fw-bold'>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
  <Form.Group className='my-2' controlId='password'>
    <Form.Label className='fw-bold'>Password</Form.Label>
    <div className='position-relative'>
      <Form.Control
        type={showPassword ? 'text' : 'password'}
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className='pr-5' // Add padding-right to prevent text from overlapping the icon
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
</Col>
          <Col md={6} sm={12}>
            <Form.Group className='my-2' controlId='confirmPassword'>
              <Form.Label className=' fw-bold '>ConfirmPassword</Form.Label>
              <div className=' position-relative'>
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                
              />
              <Button
            className='position-absolute bg-transparent border-0 p-0'
            style={{
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              zIndex: 2,
            }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword? (
                <FaEye  className='text-black '/>
              ) : (
                <FaEyeSlash className='text-black  ' />
              )}


            </Button>
            </div>

            </Form.Group>
            
          </Col>
          <Col md={12}>
            {captchaLoading ? (
              <Loader /> // Optionally show a loader while captcha key is loading
            ) : (
              <ReCAPTCHA
                sitekey={siteKey}
                onChange={handleCaptcha}
                ref={recaptchaRef}
              />
            )}
          </Col>
        </Row>
        <Button
          disabled={isLoading} 
          type='submit' 
          variant='primary'
          className="d-block me-auto ms-auto mt-4"
        >
          Register
        </Button>
      </Form>
      <Row className='ms-3 mb-2'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
