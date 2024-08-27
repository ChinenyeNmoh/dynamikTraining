
import { Table, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import {useGetUsersQuery, useDeleteUserMutation} from '../slices/userApiSlice';
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";

const UsersScreen = () => {
    const { data, refetch, isLoading, error } = useGetUsersQuery();
    const users = data?.users
    
   
    const [deleteUser] = useDeleteUserMutation();
    const deleteHandler = async (id) => {
      if (window.confirm('Are you sure')) {
        try {
          const res = await deleteUser(id).unwrap;
          console.log(res.message || 'User deleted')
          toast.success( res?.message)
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };
  
    return (
      <>
        <h1 className='text-center text-success mt-5'>Users</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error || error?.data?.error}
          </Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user._id.toString().substring(0,7)}</td>
                  <td>
                   
                        {user.name} <br />
                   
                  </td>
                  <td>
                    
                      <a href={`mailto:${user.email}`}>{user.email}</a><br />
                      
                     
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    
                      <>
                        <Button
                          as={Link}
                          to={`/admin/user/${user._id}`}
                          style={{ marginRight: '10px' }}
                          variant='light'
                          className='btn-sm'
                        >
                          <GrView className='fs-4 text-primary'/>
                        </Button>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash />
                        </Button>
                      </>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
      
    );
  };
  
  export default UsersScreen;
