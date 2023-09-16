import { useSelector } from "react-redux"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button, Alert, OverlayTrigger, Popover } from "react-bootstrap"
import { useState } from "react";
 import { useCreateOrderMutation } from "../services/appApi";
 import {  CardElement,  useElements, useStripe } from "@stripe/react-stripe-js"
import Spinner from 'react-bootstrap/Spinner';
import {useNavigate} from "react-router-dom"
import "../styles/CheckoutForm.css"







function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const user = useSelector((state) => state.user)
  const [address, setAddress] = useState("")
  const [country, setCountry] = useState("")
  const [paying, setPaying] = useState(false)
  const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation()
  const [msgalert, setMsgAlert] = useState("")
  const navigate = useNavigate()





  async function handlePay(e) {
      e.preventDefault();
      if (!stripe || !elements || user.cart.count <= 0 ) return;
      setPaying(true)

      //getting client secret from server

                
                // const res = await fetch("http://localhost:5050/create-payment", {

                const res = await fetch("https://long-ruby-chiton-cape.cyclic.cloud/create-payment", {



          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer "
          },
          body: JSON.stringify({ amount: user.cart.total })
      })
     const { client_secret } = await res.json()
          


      const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
              card: elements.getElement(CardElement)
          }
      })
      setPaying(false)

      if (paymentIntent) {
          let res = await createOrder({ userId: user._id, cart: user.cart, address, country })
          if(!isLoading && !isError){
              alert("Successfully Purchased!!")
              setMsgAlert(`Payment ${paymentIntent.status}`)
              console.log(paymentIntent.status)
              setTimeout(()=>{
                   navigate("/orders")
              },2000)
          }
      }
  }

  const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Test card details</Popover.Header>
        <Popover.Body>
            <p><strong>Card No.:</strong> 4242 4242 4242 4242</p>
            <p><strong>Expiry Date:</strong> 04/42</p>
            <p><strong>CVC:</strong> 424</p>
            <p><strong>ZIP:</strong> 42424</p>
        </Popover.Body>
    </Popover>
)


  return (
      <div>
           {msgalert && <Alert variant="success">{msgalert}</Alert>}
          <Form onSubmit={handlePay} className="mb-4">
              <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" value={user.email} disabled />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter Name" value={user.name} disabled />
                  </Form.Group>
              </Row>
              <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Control type="text" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                  </Form.Group>
              </Row>
              <h4 className="my-3">Card details</h4>
             
              <CardElement />
              <Button variant="primary"  className="my-4" type="submit" disabled={user.cart.count <= 0 || paying || isSuccess}>
                  {paying ? (
                      <>
                          <Spinner as="span" animation="border" variant="warning" /> Processing
                      </>
                  ) : (
                      <>
                          Make Payment
                      </>
                  )}
              </Button>
              <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
     <Button variant="danger"  className="my-01" >View Test Card details</Button>
      </OverlayTrigger>


          </Form>
      </div>
  )
}

export default CheckoutForm



