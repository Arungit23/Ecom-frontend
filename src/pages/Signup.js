import React, { useState, useEffect, useRef } from 'react'
import { Alert, FloatingLabel, Button, Col, Container, Row  } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import { useSignupMutation } from "../services/appApi";
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { useForm } from "react-hook-form"
import Form from 'react-bootstrap/Form';
import axios from "../axios";
import "../styles/NewProduct.css"



function Signup() {

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [name, setName] = useState('');
 const [mobile, setMobile] = useState('');
 const [gender, setGender] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [image, setImage] = useState([]);
 const [imgBtn, setImgBtn] = useState(false)

   const [images, setImages] = useState([]);
    // const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [removeImg, setRemoveImg] = useState(null)






     

 const [signup, { error, isLoading, isError }] = useSignupMutation();

 function handleSignup(e) {
  e.preventDefault();
  signup({ name, email, password, mobile, gender, confirmPassword, images });
 } 







function showWidget() {
  const cloudWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dsi3wgofc',
        uploadPreset: "upqenbmy",
      },
      (err, result) => {
          if (!err && result.event === "success") {
              setImages({ url: result.info.url, public_id: result.info.public_id })
              setImgBtn(true)
          }
      }
  )
  cloudWidget.open()
}

async function deleteImage(deleteImg) {
  setRemoveImg(deleteImg.public_id);

  // let res = await fetch(`"http://localhost:5050"/images/${deleteImg.public_id}`, {

  let res = await fetch(`"https://long-ruby-chiton-cape.cyclic.cloud"/images/${deleteImg.public_id}`, {


      method: "DELETE"
  })
  setRemoveImg(null);
  setImages(null)
  setImgBtn(false)
}



  return (
    <Container>
    <Row>
   <Col md={6} className="signup__form--container">
     <Form style={{ width: "100%" }} onSubmit={handleSignup}>
      <h1>Create an account</h1>
       {isError && <Alert variant="danger">{error.data}</Alert>}
 
  <Form.Group>
       <Form.Label>Name</Form.Label>
     <Form.Control type="text" placeholder="Enter Your name" value={name} required onChange={(e) => setName(e.target.value)} />
     </Form.Group>

     <Form.Group>
    <Form.Label>Email Address</Form.Label>
 <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e) => setEmail(e.target.value)} />
   </Form.Group>

<Form.Group className="mb-3">
<Form.Label>Password</Form.Label>
<Form.Control type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
</Form.Group>


<Form.Group className="mb-3">
<Form.Label>ConfirmPassword</Form.Label>
<Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Mobile</Form.Label>
<Form.Control type="Mobile number" placeholder="Enter Phone Number" value={mobile} required onChange={(e) => setMobile(e.target.value)} />
</Form.Group>


<Form.Group className="mb-3">
<Form.Label>Gender</Form.Label>

{/* <Form.Control  type="option" value={gender} required onChange={(e) => setGender(e.target.value)} /> */}
<Form.Select  type="option" value={gender} required onChange={(e) => setGender(e.target.value)}>


<option>Open this select menu</option>
                 <option value="Male">Male</option>
                       <option value="Female">Female</option>
                       <option value="Others">Others</option>
          </Form.Select>
                      
</Form.Group>


<Form.Group className="mb-3">
       <Button type="button" onClick={showWidget}>
            Upload Profile Photo
</Button>
{/* <div className="images-preview-container" style={{ width: "300px", margin: "0 auto" }}>

{images.map((image) => (
<div className="images-preview-container" style={{ width: "300px", margin: "0 auto" }}>
<img src={image.url} alt="image"  style={{ width: "200px", height: "200px", objectFit: "cover"}} />
{removeImg != image.public_id && <AiOutlineMinusCircle className="fa fa-times-circle" onClick={() => deleteImage(image)} />}
</div> 
))} */}


<div className="images-preview-container" style={{ width: "300px", margin: "0 auto" }}>

{imgBtn && ( 
<div className="images-preview-container" style={{ width: "300px", margin: "0 auto" }}> 
<img src={images?.url} alt="image"  style={{ width: "200px", height: "200px", objectFit: "cover"}} /> 
{removeImg != images.public_id && <AiOutlineMinusCircle className="fa fa-times-circle" onClick={() => deleteImage(images)} />} 


</div> 
)} 
</div> 


</Form.Group>


<Form.Group>
<Button type="submit" disabled={isLoading}>
Create account
</Button>
</Form.Group>
<p className="pt-3 text-center">
Don't have an account? <Link to="/login">Login</Link>{" "}
</p>
</Form>
</Col>
<Col md={6} className="signup__image--container"></Col>
</Row>
</Container>
    );
}





export default Signup;