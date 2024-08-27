import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col, Card } from 'react-bootstrap';

import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useUpdateProfileMutation, useGetUserQuery } from '../slices/userApiSlice';
import { useDispatch } from 'react-redux';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const { data, isLoading, error } = useGetUserQuery();
  const user = data?.user;


  useEffect(() => {
    if(user){
        setName(user.name);
        setEmail(user.email);
        
    }
  }, [user]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
      try {
        const res = await updateProfile({
          name,
          
        }).unwrap();
        dispatch(setCredentials(res?.user));
        toast.success(res.message);
      } catch (err) {
        console.error(err);
        toast.error(err?.data?.message || err.error);
      }
  };

  return (
    <Row className='w-100'>
     
      <Col md={8}>
      <h3 className='text-center text-success mt-5'>Completed Module</h3>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error?.data?.error || error.error}
          </Message>
        ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Video</th>
                </tr>
              </thead>
              <tbody>
                {user?.completedModule.map((module, index) => (
                  <tr key={index}>
                    <td>{module.video.order}</td>
                    <td>{module.title}</td>
                    <td>N{module.video.url}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
      </Col>
      <Col md={4} >
      {isUpdating && <Loader />}
        <h3 className='text-center text-success mt-5'>User Profile</h3>
        <Card>
        <Form className="m-3"  onSubmit={submitHandler}>
            <Row>
                <Col md={12}>
                <Form.Group className='my-2' controlId='name'>
            <Form.Label className='fw-bold'>Full Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter first name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
                </Col>
               
                <Col md={12}>
                <Form.Group className='my-2' controlId='email'>
            <Form.Label className='fw-bold'>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              disabled={true}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
                </Col>
            
            
            </Row>
          <Button 
          type='submit' 
          variant='primary'
          className="d-block me-auto ms-auto mt-4"
          >
            Update
          </Button>
        </Form>
        </Card>
      </Col>
      
    </Row>
  );
};

export default ProfileScreen;