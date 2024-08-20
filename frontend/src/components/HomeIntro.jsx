import React from 'react'
import {Row, Col, Image, Button} from 'react-bootstrap'

const HomeIntro =  () => {
 
  return (
    <section className="bg-secondary-subtle my-5 rounded">
          <Row className='p-3'>
            <Col md={5} className="mt-5 rounded ">
            <Image 
            src="/images/train.jpg"
            alt="Placeholder"
            className='mb-5 w-100 px-3 custom-rounded  '
            />
            </Col>
            <Col md={7} className=" ">
            <h1 className='mt-5  text-center lh-base'> <span className='title'>Develop your</span> <br /> mind and skill</h1>
            <p className='fst-italic '>Join us on a journey of creativity, craftsmanship, and sustainable practices as we empower you to turn your passion for soap making into a thriving skill or business.</p>
            <Button variant='primary' className='d-block mx-auto rounded-pill px-4 py-2'>Get Started</Button>
            </Col>
        </Row>
      </section>
  )
};


export default HomeIntro