import Form from 'react-bootstrap/Form';
import {  FloatingLabel,  Alert, Col, Container,  Row, Button, } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { useUpdateMutation } from '../services/appApi'; 
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../features/userSlice"
import "../styles/Profile.css"



function Profile() {
   const { id } = useParams();
  const user = useSelector((state) => state.user)
  const [userData, setUserData] = useState({
      name: "",
      email: "",
      mobile: "",
      gender: ""
  })

  const [image, setImage] = useState([]);
 const [images, setImages] = useState([null]);
     const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [removeImg, setRemoveImg] = useState(null)
     const [imgBtn, setImgBtn] = useState(false)
     const [editUser, setEditUser] = useState(false)
 const dispatch = useDispatch()



 async function getUserProfile() {

  // const res = await fetch(`http://localhost:5050/users/${user._id}/profile`)

  const res = await fetch(`https://long-ruby-chiton-cape.cyclic.cloud/users/${user._id}/profile`)



  const userDetails = await res.json()

   console.log(userDetails);
  setUserData((preVal) => {
      return { ...preVal, name: userDetails.name, email: userDetails.email, mobile: userDetails.mobile, gender: userDetails.gender }
  })
   console.log(userData);
    setImages(userDetails?.profilephoto[0])
  setImgBtn(true)
}
useEffect(() => {
  getUserProfile()
}, [])






async function deleteImage(deleteImg) {
  setRemoveImg(deleteImg.public_id);

      // let res = await fetch(`"http://localhost:5050"/images/${deleteImg.public_id}`, {

      let res = await fetch(`"https://long-ruby-chiton-cape.cyclic.cloud"/images/${deleteImg.public_id}`, {



 
  method: "DELETE"
  })
  setRemoveImg(null);
   setImages(null)
        setImgBtn(false)
  // setImages((prev) => prev.filter((img) => img.public_id !== deleteImg.public_id))

}




function showWidget() {
  const widget = window.cloudinary.createUploadWidget(
      {
       cloudName: 'dsi3wgofc',
       uploadPreset: "upqenbmy",
      },
      (error, result) => {
          if (!error && result.event === "success") {
              // setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
     setImages({ url: result.info.url, public_id: result.info.public_id });
     setImgBtn(true)
            }
      }
  );
  widget.open();
}




 const [update, { error, isLoading, isError, isSuccess }] = useUpdateMutation();



function handleChange(e) {
 e.preventDefault()
 const { name, value } = e.target;
 setUserData((preVal) => {
     return { ...preVal, [name]: value }
 })
}

async function handleSubmit(e) {
 e.preventDefault();
 const name = userData.name;
 const email = userData.email;
 const mobile = userData.mobile;
 const gender = userData.gender;
 const userId = user._id;
  update({ userId, name, email, mobile, gender, images})



}


async function deleteUser() {
 if (window.confirm("Are you sure about deleting your account?")) {
     const userId = user._id;

    //  const res = await fetch(`http://localhost:5050/users/${userId}/profile`, {

    const res = await fetch(`https://long-ruby-chiton-cape.cyclic.cloud/users/${userId}/profile`, {


         method: "DELETE"
     })
     console.log(res);
     if (res.ok) {
         alert("User deleted successfully!!")
         dispatch(logout())
     }
 }
}

return(
  <Container>
     {isSuccess && <Alert variant="success">Profile details updated successfully</Alert>}
    {isError && <p className='errormsg'>{error.data}</p>}
  <Row className="form-style-5" >
  <Col  md={6} className="signup__form--container" >
 
  <form   style={{ width: "100%" }}>
    <div>
     

    <h3 className="profile">Your Profile</h3>
   



    <Form.Group>
       <Form.Label className="lable1">Name</Form.Label>
     <Form.Control 
      id="name"
     type="text" 
     placeholder="Enter Your name"
     name='name'
     value={userData.name}
     onChange={handleChange}
     disabled={editUser}
      />
     </Form.Group>


     <Form.Group>
       <Form.Label  className="lable1">Email</Form.Label>
     <Form.Control 
     id="email"
     type="email"
     placeholder="name@example.com"
     name='email'
     value={userData.email}
     disabled
      
      />
     </Form.Group>

     <Form.Group>
       <Form.Label  className="lable1">Mobile</Form.Label>
     <Form.Control 
      id="mobile"
      type="number"
      placeholder="Mobile number"
      name='mobile'
      value={userData.mobile}
      onChange={handleChange}
      disabled={editUser}
      />
     </Form.Group>

     <Form.Group className="mb-3">
<Form.Label  className="lable1">Gender</Form.Label>


<Form.Select aria-label="gender" name='gender' value={userData.gender} onChange={handleChange} disabled={editUser}>
 
<option>Open this select menu</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
    <option value="Others">Others</option>
          </Form.Select>
                      
</Form.Group>

<Form.Group className="mb-3">
       <Button type="button" onClick={showWidget} disabled={imgBtn}>
            Upload Profile Photo
</Button> 
<div className="images-preview-container">
                                {/* {images.map((image) => (
                                    // <div className="image-preview">
                                    //     <img src={image.url} />
                                    //     {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    // </div>

                                    <div className="images-preview-container">
                                    <img src={image.url} alt="image" />
                                    {removeImg != image.public_id && <AiOutlineMinusCircle className="fa fa-times-circle" onClick={() => deleteImage(image)} />}
                                </div>    

                                ))} */}
                            </div>


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
<Button type="submit" variant="primary" className='me-2' disabled={isLoading} onClick={handleSubmit}>Update</Button>
<Button type="button" variant="danger" onClick={deleteUser}>Delete</Button>

</Form.Group>


    {/* </form> */}
    
    
    </div>
    </form>
</Col>
<Col md={6} className="signup__image--container"></Col>
  
  </Row>
</Container>
  
 

)

}
export default Profile









