import React, { useState } from 'react'
import "../styles/NewProduct.css"
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../services/appApi';
import { Alert, Col, Container, Form, Row, Button, } from 'react-bootstrap';
import axios from "../axios";
import { AiOutlineMinusCircle } from 'react-icons/ai';





function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [removeImg, setRemoveImg] = useState(null)
  const [imgBtn, setImgBtn] = useState(false)

  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();




async function deleteImage(deleteImg) {
  setRemoveImg(deleteImg.public_id);


  // let res = await fetch(`"http://localhost:5050"/images/${deleteImg.public_id}`, {

  let res = await fetch(`"https://long-ruby-chiton-cape.cyclic.cloud"/images/${deleteImg.public_id}`, {



      method: "DELETE"
  })
  setRemoveImg(null);
  setImages((prev) => prev.filter((img) => img.public_id !== deleteImg.public_id))

}

  
function handleSubmit(e) {
  e.preventDefault();
  if (!name || !description || !price || !category || !images.length) {
      return alert("Please fill out all the fields");
  }
  createProduct({ name, description, price, category, images }).then(({ data }) => {
      if (data.length > 0) {
          setTimeout(() => {
              navigate("/");
          }, 1500);
      }
  });
}
  


  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
          cloudName: 'dsi3wgofc',
          uploadPreset: "upqenbmy",
      },
      (error, result) => {
          if (!error && result.event === "success") {
              setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
          }
      }
  );
  widget.open();
}



  

  return (
       <Container>
        <Row>
        <Col md={6} className="new-product__form--container">
        <Form style={{ width: "100%" }} onSubmit={handleSubmit} >
<h1 className="mt-4">Create a product</h1>
{isSuccess && <Alert variant="success">Product created with succcess</Alert>}
{isError && <Alert variant="danger">{error.data}</Alert>}
<Form.Group className="mb-3">
<Form.Label>Product name</Form.Label>
<Form.Control type="text" placeholder="Enter product name" value={name} required onChange={(e) => setName(e.target.value)} />
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Product description</Form.Label>
<Form.Control as="textarea" placeholder="Product description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Price($)</Form.Label>
<Form.Control type="number" placeholder="Price ($)" value={price} required onChange={(e) => setPrice(e.target.value)} />
</Form.Group>

<Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
<Form.Label>Category</Form.Label>
<Form.Select>
<option disabled selected>
-- Select One --
   </option>
   <option value="technology">technology</option>
    <option value="others">others</option>
   <option value="phones">phones</option>
   <option value="laptops">laptops</option>
   </Form.Select>
  </Form.Group>

  <Form.Group className="mb-3">
<Button type="button" onClick={showWidget}>
Upload Images
</Button>


 <div className="images-preview-container">
{images.map((image) => (
<div className="image-preview">
<img src={image.url} alt="image" />
{removeImg != image.public_id && <AiOutlineMinusCircle className="fa fa-times-circle" onClick={() => deleteImage(image)} />}
</div>
))}
</div> 



</Form.Group>

<Form.Group>
<Button type="submit" disabled={isLoading || isSuccess}>
Create Product
</Button>
</Form.Group>
</Form>
</Col>
<Col md={6} className="new-product__image--container"></Col>
</Row>
        </Container>
    );
}

export default NewProduct;