import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetModulesQuery, useDeleteModuleMutation, useCreateModuleMutation } from '../slices/moduleApiSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';

const CreateModuleScreen = () => {
  // Fetch modules and handle loading and error states
  const { data, isLoading, error, refetch } = useGetModulesQuery();
  const [deleteModule] = useDeleteModuleMutation();
  const modules = data?.modules || [];

  // Handler for deleting a module
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        const res = await deleteModule(id).unwrap();
        toast.success(res.message);
        refetch(); // Refetch modules to update the table
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // Mutation hook for creating a module
  const [createModule, { isLoading: loadingCreate }] = useCreateModuleMutation();

  // Handler for creating a new module
  const createModuleHandler = async () => {
    if (window.confirm('Are you sure you want to create a new module?')) {
      try {
        const res = await createModule().unwrap();
        toast.success(res.message);
        refetch(); // Refetch modules to include the new module
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      {/* Button to create a new module */}
      <Row className='d-flex justify-content-end mb-5'>
        <Col sm={12} md={6} lg={4} xl={3}>
          <Button className='mt-5' onClick={createModuleHandler}>
            <FaPlus /> Create Module
          </Button>
        </Col>
      </Row>

      {/* Loader and error handling */}
      {loadingCreate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message}</Message>
      ) : (
        <>
          {/* Table displaying modules */}
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Video</th>
                <th>Duration</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module._id}>
                  <td>{module._id.toString().substring(0, 7)}</td>
                  <td>{module.title}</td>
                  <td>{module.video.url}</td>
                  <td>{module?.video.duration}</td>
                  <td>{module?.video.order}</td>
                  <td>
                    {/* Edit button for each module */}
                    <Button
                      as={Link}
                      to={`/admin/module/${module._id}`}
                      variant='light'
                      className='btn-sm mx-2'
                    >
                      <FaEdit className='text-success' />
                    </Button>
                    {/* Delete button for each module */}
                    <Button
                      variant='light'
                      className='btn-sm bg-transparent outline-none'
                      onClick={() => deleteHandler(module._id)}
                    >
                      <FaTrash className='text-danger' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default CreateModuleScreen;
