import React, { useState, useEffect } from 'react';
import { useUpdateModuleMutation, useGetModuleQuery } from '../slices/moduleApiSlice';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditModuleScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: moduleLoading, error: getError } = useGetModuleQuery(id);
  const module = data?.module;
  const [updateModule, { isLoading: updateLoading, error, refetch }] = useUpdateModuleMutation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [order, setOrder] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateModule({
        id,
        title,
        content,
        url,
        duration,
        order,
      }).unwrap();
      toast.success(res.message);
      refetch();
      navigate('/admin/module');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (module) {
      setTitle(module.title);
      setContent(module.content);
      setUrl(module.video.url);
      setDuration(module.video.duration);
      setOrder(module.video.order);
    }
  }, [module]);

  return (
    <>
      <Link to='/admin/module' className='btn btn-primary my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h3 className='text-center text-success mt-3'>Edit Module</h3>
        {updateLoading && <Loader />}
        {moduleLoading && <Loader />}
        <Form className='m-3' onSubmit={submitHandler} encType="multipart/form-data">
          <Row>
            <Col md={12}>
              <Form.Group className='my-2' controlId='title'>
                <Form.Label className='fw-bold'>Title</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className='my-2' controlId='content'>
                <Form.Label className='fw-bold'>Content</Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className='my-2' controlId='url'>
                <Form.Label className='fw-bold'>Url</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter url'
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='my-2' controlId='duration'>
                <Form.Label className='fw-bold'>Duration</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter duration'
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='my-2' controlId='order'>
                <Form.Label className='fw-bold'>Order</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter order'
                  value={order}
                  disabled={true}
                  onChange={(e) => setOrder(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button type='submit' variant='primary' className='d-block me-auto ms-auto mt-4'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default EditModuleScreen;
