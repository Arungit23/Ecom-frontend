import React, { useRef, useState } from 'react'
import { Navbar, Button, Nav, NavDropdown, Container } from"react-bootstrap";
import "../styles/Navigation.css";
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { logout, resetNotifications  } from '../features/userSlice';
import axios from "../axios";



function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const bellRef = useRef(null);
    const notificationRef =  useRef(null);
    const [bellpos, setBellPos] = useState({});
      const profilePhoto = user?.profilephoto[0].url;


    function handleLogout() {
        dispatch(logout());
        alert("Logout successful")
}
const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status == "unread") return acc + 1;
    return acc;
}, 0);

function handleToggleNotifications() {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    notificationRef.current.style.display = notificationRef.current.style.display === "block" ? "none" : "block";
    dispatch(resetNotifications());
    if (unreadNotifications > 1) axios.post(`/users/${user._id}/updateNotifications`);
}

  return (
   <Navbar bg="light" expand="lg">
   <Container className='nav'>
    <LinkContainer to="/">
    <Navbar.Brand className='shop'>Shopping Mart</Navbar.Brand>
    </LinkContainer>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="ms-auto">

            {/* no user */}

           {!user && (
                  <LinkContainer to="/login">
                  <Nav.Link className='log'>Login</Nav.Link>
              </LinkContainer>
          )}

{!user && (
                  <LinkContainer to="/signup">
                  <Nav.Link className='reg'>Register</Nav.Link>
              </LinkContainer>
          )}


{user && !user.isAdmin && (
<LinkContainer to="/cart">
<Nav.Link>
<i className="fas fa-shopping-cart"></i>
{user?.cart.count > 0 && (
<span className="badge badge-warning" id="cartcount">
{user.cart.count}
</span>
)}
</Nav.Link>
</LinkContainer>
  )}
   
  {/* if user */}

  {user && (
<>
<Nav.Link style={{ position: "relative" }}  onClick={handleToggleNotifications} >
<i className="fas fa-bell" ref={bellRef} data-count={unreadNotifications || null} ></i>
</Nav.Link>
{/* <NavDropdown title={`${user.email}`} id="basic-nav-dropdown"> */}
<NavDropdown title={`${user.name}`} id="basic-nav-dropdown">

{user.isAdmin && (
<>
<LinkContainer to="/admin">
<NavDropdown.Item>Dashboard</NavDropdown.Item>
</LinkContainer>
<LinkContainer to="/new-product">
<NavDropdown.Item>Create Product</NavDropdown.Item>
</LinkContainer>
</>
)}
{!user.isAdmin && (
<>
<LinkContainer to="/cart">
<NavDropdown.Item>Cart</NavDropdown.Item>
</LinkContainer>
<LinkContainer to="/orders">
<NavDropdown.Item>My orders</NavDropdown.Item>
</LinkContainer>



<LinkContainer to="/profile">
<NavDropdown.Item>profile</NavDropdown.Item>
</LinkContainer>



</>
)}



<NavDropdown.Divider />
<Button variant="danger" onClick={handleLogout} className="logout-btn">
Logout
</Button>
</NavDropdown>
</>
)}

{user && (
<img src={profilePhoto} width={40} height={40} style={{objectFit:"cover", borderRadius:"50%", alignItems:"center"}} />
 )}



</Nav>
</Navbar.Collapse>
       </Container>


{/* notifications */}


<div className="notifications-container" ref={notificationRef} style={{position:'absolute', top: bellpos.top + 30, left: bellpos.left, display : "none"}}>
{user?.notifications.length > 0 ? (
user?.notifications.map((notification) => (
<p className={`notification-${notification.status}`}>
{notification.message}
<br />
<span>{notification.time.split("T")[0] + " " + notification.time.split("T")[1]}</span> 

</p>
        ))
) : (
    <p>No notifcations yet</p>
  )  }
     
            </div>
        </Navbar>
    );
}

export default Navigation;