import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container, Row, Col} from "react-bootstrap";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot, FaXTwitter  } from "react-icons/fa6";
import { FaUser, FaPhone, FaInstagram, FaFacebook,   } from "react-icons/fa";
import { Link } from "react-router-dom"
import Image from 'react-bootstrap/Image';
import Loader from './Loader';
import { useState } from 'react';
import { AiOutlineMessage } from "react-icons/ai";
import {toast} from 'react-toastify';



const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [mobile, setMobile] = useState('');
   

    const enquiryHandler = async (e) => {
        e.preventDefault();
        
            console.log('footer')
    }

  return (
    <footer className="bg-dark">
      <Container >
        <Row className="d-flex justify-content-between">
        <Col md={4} className="text-white">
        <h3 className="text-center mt-4 mb-4 pt-3 text-primary">About Us</h3>
        <p className="fst-italic"> 
        At dynamikTraining we are passionate about the art and science of soap making. 
        With a deep commitment to quality and safety, we provide comprehensive training programs that equip individuals and businesses with the skills they need to create exceptional soap products. 
        


        <br />
        <br />
        We believe that learning should be accessible and engaging, which is why our interactive training modules offer step-by-step guidance, hands-on practice, 
        and expert insights. Whether you're a beginner or an experienced soap maker looking to refine your craft, our programs are designed to meet your needs and help you succeed in the world of soap making.
        </p>
          </Col>
          <Col md={4} className="text-white ">
          <h3 className="text-center text-primary mt-4 mb-4 pt-3" >Quick Links</h3>
          <p >
            <FaLocationDot className="text-danger me-2 "/>
            Plot 25, Block 72 Adebisi Popoola Crescent Off Victoria Arobieke, Lekki Phase 1, Lagos, Nigeria.
            </p>
            <p>
            <FaPhone className="text-light me-2 "/>
            +2347090567890, +2347047893564
            </p>
            <p>
            <IoMdMail className="text-light me-2 " />info@dynamiktraining.com
            </p>
            <h3 className="fst-normal mb-3 text-center text-primary">Follow Us</h3>
            <div className="d-flex gap-3">
            <Link to="#">
            <FaFacebook className="text-primary fs-4"/>
            </Link>
            <Link to="#">
            <Image src='/images/instagram.png' className='google'></Image>
            </Link>
            <Link to="#">
            <FaXTwitter className="text-white fs-4 " />
            </Link>
            </div>
            

          </Col>
          <Col md={4} className="text-primary">
            <h3 className="text-center mt-4 mb-4 pt-3">Send a Message</h3>
            <Form onSubmit={enquiryHandler}>
              <InputGroup className="mb-3 ">
                <InputGroup.Text ><FaUser /></InputGroup.Text>
                <Form.Control 
                type="text" 
                placeholder="John Doe" 
                className="fst-italic"
                onChange={(e) => setName(e.target.value)}
                 />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text ><FaPhone /></InputGroup.Text>
                <Form.Control 
                type="number" 
                placeholder="09090000000" 
                className="fst-italic"
                onChange={(e) => setMobile(e.target.value)}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text ><IoMdMail /></InputGroup.Text>
                <Form.Control 
                type="email" 
                placeholder="johndoe@email.com" 
                className="fst-italic"
                onChange={(e) => setEmail(e.target.value)}
                 />
              </InputGroup>

              <InputGroup className="mb-3">
              <InputGroup.Text ><AiOutlineMessage /></InputGroup.Text>
                <Form.Control 
                as="textarea" 
                placeholder="Enter your message here" 
                className="fst-italic"
                onChange={(e) => setMessage(e.target.value)}
                />
                </InputGroup>

              <Button 
              variant="primary" 
              type="submit" 
              className="send"
              >
                send
              </Button>
            </Form>
            
          </Col>
          
          <p className="text-dark text-center fw-bold">dynamikTraining &copy; {currentYear}</p>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer