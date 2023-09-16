import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, OverlayTrigger, Popover, Row } from 'react-bootstrap'
import { Link } from "react-router-dom";
import "../styles/Signup.css";
import { useLoginMutation } from '../services/appApi';

function Login() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [login, { isError, isLoading, error }] = useLoginMutation();

 function handleLogin(e) {
  e.preventDefault();
  login({ email, password });
 }

 const popover = (
  <Popover id="popover-basic">
      <Popover.Header as="h3">Test Credentials</Popover.Header>
      <Popover.Body>
          <p><strong>Email:</strong>arun@gmail.com</p>
          <p><strong>Password:</strong>arun123</p>
      </Popover.Body>
  </Popover>
 )

  return (
    <Container>
     <Row>
     <Col md={6} className="login__form--container">
   <Form style={{ width:"100% "}}  onSubmit={handleLogin}>
    <h1>Login to your account</h1>
    {isError && <Alert variant="danger">{error.data}</Alert>}
    <Form.Group>
     <Form.Label>Email Address</Form.Label>
     <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e)=> setEmail(e.target.value)} />
    </Form.Group>

     <Form.Group className="mb-3">
     <Form.Label>Password</Form.Label>
     <Form.Control type="password" placeholder="Enter Password" value={password} required onChange={(e)=> setPassword(e.target.value)} />
    </Form.Group>

    <Form.Group>
     <Button type="submit" disabled={isLoading}>Login</Button>
    </Form.Group>
    <p className='pt-3 text-center'>
     Don't Have an account ?<Link to="/signup">Create account</Link></p>
   </Form>
   <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
     <Button variant="danger"  className="my-01" >View Test Credentials</Button>
      </OverlayTrigger>

   
     </Col>
     <Col md={6} className="login__image--container"></Col>
     </Row>
    </Container>
  );
}

export default Login
