import { useEffect, useState } from 'react';
import { Table, Form,  Row, Col, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {  useGetUserByIdQuery } from '../slices/userApiSlice';
import { useParams, Link } from 'react-router-dom';


const AdminUserScreen = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { data, isLoading, error } = useGetUserByIdQuery(id);
  const user = data?.user;


  useEffect(() => {
    if(user){
        setName(user.name);
        setEmail(user.email);
        
    }
  }, [user]);

 

  return (
    <>
     <Link to='/admin/users' className='btn btn-primary mt-5'>
        Go Back
      </Link>
    
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
                {user?.completedModule.map((module) => (
                  <tr key={user._id}>
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
    
        <h3 className='text-center text-success mt-5'>User Profile</h3>
        <Card>
        <Form className="m-3"  >
            <Row>
                <Col md={12}>
                <Form.Group className='my-2' controlId='name'>
            <Form.Label className='fw-bold'>Full Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter first name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={true}
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
        </Form>
        </Card>
      </Col>
      
    </Row>
    </>
  );
};

export default AdminUserScreen;
  