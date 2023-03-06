import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getTotals } from "../features/cartSlice";
import { logout } from "../features/userSlice";
import "./Navigation.css";
import PopModal from "./PopModal";
import PopCart from "./PopCart";
import { AiFillYoutube } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
function Navigation() {
  const { cart, totalQuantity } = useSelector((state) => state.cart);
  ////////
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Navbar expand="lg" className="navbar-dark " fixed="top">
        <Container>
          <>
            {/* <LinkContainer to="/">
              <Navbar.Brand>
                Management<Navbar.Brand className="brand">Chuwa</Navbar.Brand>
              </Navbar.Brand>
            </LinkContainer> */}
          </>
          {user && user.isAdmin ? (
            <LinkContainer to="/">
              <Navbar.Brand>
                Adminmanagement
                <Navbar.Brand className="brand"></Navbar.Brand>
              </Navbar.Brand>
            </LinkContainer>
          ) : (
            <LinkContainer to="/">
              <Navbar.Brand>
                Management<Navbar.Brand className="brand"></Navbar.Brand>
              </Navbar.Brand>
            </LinkContainer>
          )}

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* if no user */}
              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link className="nav-login-item">Login</Nav.Link>
                </LinkContainer>
              )}
              {!user && (
                <Nav.Link>
                  <ShoppingCartCheckoutRoundedIcon
                    className="shop-cart"
                    onClick={() => {
                      setOpen2(true);
                    }}
                  />
                  {cart.length > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {totalQuantity}
                    </span>
                  )}
                </Nav.Link>
              )}
              {user && (
                // <LinkContainer to="/cartModal">
                <Nav.Link>
                  <ShoppingCartCheckoutRoundedIcon
                    className="shop-cart"
                    onClick={() => {
                      setOpen(true);
                    }}
                  />

                  {user?.cart.count > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {user.cart.count}
                    </span>
                  )}
                </Nav.Link>
                // </LinkContainer>
              )}
              {/* not user */}

              {/* if user */}
              {user && (
                <>
                  <NavDropdown
                    className="nav-login-item"
                    title="Sign Out"
                    id="basic-nav-dropdown"
                  >
                    {user.isAdmin && (
                      <>
                        <LinkContainer to="/admin">
                          <NavDropdown.Item className="dropdon-item">
                            Admin Dashboard
                          </NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to="/new-product">
                          <NavDropdown.Item className="dropdon-item">
                            Create Items
                          </NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                    {/* {!user.isAdmin && (
                    <>
                      <LinkContainer to="/cart">
                        <NavDropdown.Item>Cart</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )} */}

                    <NavDropdown.Divider />
                    <button
                      style={{ marginRight: "10px" }}
                      className="logou-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </NavDropdown>
                  {/* <Button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </Button> */}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {open && <PopModal style={{ margin: "0" }} closeModal={setOpen} />}
      {open2 && <PopCart style={{ margin: "0" }} closeModal={setOpen2} />}
      <Navbar className="footer" fixed="bottom">
        <Nav className="footer-container">
          <div className="copy-right">@2023 All Rights Reserves</div>
          <div className="icon-group ">
            <BsInstagram className="insta-icon" />
            <AiFillYoutube className="yt-icon" />
            <AiOutlineTwitter className="twi-con" />
          </div>
          <div className="contact-group">
            <div className="contact">Contact</div>
            <div className="privacy">Privacy Policles</div>
            <div className="help">Help</div>
          </div>
        </Nav>
      </Navbar>
    </>
  );
}

export default Navigation;
