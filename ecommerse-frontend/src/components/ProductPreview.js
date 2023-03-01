// import axios from "../axios";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { LinkContainer } from "react-router-bootstrap";
import { Link, useParams } from "react-router-dom";
import { addToProduct } from "../features/cartSlice";
import {
  useAddToCartMutation,
  useDecreaseCartProductMutation,

  // useIncreaseCartProductMutation,
} from "../services/appApi";
import "./ProductPreview.css";
//
function ProductPreview({ _id, name, pictures, price, stock }) {
  // const itemIndex = useSelector((state) =>
  //   state.cart.cart.findIndex((item) => item._id)
  // );
  // const helopme = useSelector(
  //   (state) => state.cart.cart[itemIndex].cartQuantity
  // );
  // console.log(helopme);

  const [cartQuantity, setCartQuantity] = useState(0);
  // const cartQuantity = useSelector(state=>sta)
  ///////////
  const dispatch = useDispatch();
  // const handleAddCart = () => {
  //   dispatch(addProduct({ _id, name, pictures, price, cartQuantity }));
  // };
  const handleAddToCart = () => {
    dispatch(addToProduct({ _id, name, pictures, price, stock, cartQuantity }));
  };

  // const handleAddCart = () => {
  //   if (dispatch(addProduct({ _id, name, pictures, price, cartQuantity }))) {
  //     setCartQuantity(cartQuantity + 1);
  //   }
  // };
  // const handleDecreaseToCart = () => {
  //   if (dispatch(decreaseTCart({ _id, name, pictures, price }))) {

  //   }
  // };

  ////////////
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const user = useSelector((state) => state.user);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  const [decreaseCart] = useDecreaseCartProductMutation();
  function handleDecrease(product) {
    const quantity = user.cart.count;
    if (quantity <= 0) {
      return alert("Already 0");
    }

    decreaseCart(product);
  }

  return (
    <div className="go">
      <div
        style={{
          cursor: "pointer",
          width: "13rem",
          margin: "10px",
        }}
        className="d-flex justify-content-center flex-wrap card-content"
      >
        <Card style={{ width: "20rem", margin: "auto" }}>
          <Link to={`/product/${_id}`}>
            <Card.Img
              variant="top"
              className="product-preview-img"
              src={pictures[0].url}
              style={{ height: "150px", objectFit: "cover" }}
            />
          </Link>

          <Card.Body>
            <Card.Title className="card-name">{name}</Card.Title>
            <Card.Title className="card-price">${price}</Card.Title>
            <>
              <div className="privew-btn-group2">
                {user && (
                  <div className="btn-go">
                    {!show ? (
                      <div className="add-to-cart" onClick={toggle}>
                        Add
                      </div>
                    ) : (
                      ""
                    )}
                    {show ? (
                      <>
                        <div
                          className="add-btn3"
                          onClick={() =>
                            handleDecrease({
                              userId: user._id,
                              productId: _id,
                              price: price,
                              image: pictures[0].url,
                            })
                          }
                        >
                          -
                        </div>

                        <span className="count-sty2">{user.cart[_id]}</span>

                        <div
                          className="minus-btn3"
                          onClick={() =>
                            addToCart({
                              userId: user._id,
                              productId: _id,
                              price: price,
                              image: pictures[0].url,
                            })
                          }
                        >
                          +
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                )}

                {/* //////
                ////////////////////////////////// */}
                {!user && (
                  <div className="column">
                    <div
                      className="add-btn3"
                      onClick={() =>
                        setCartQuantity((prev) => (prev == 0 ? 0 : prev - 1))
                      }
                    >
                      <div> -</div>
                    </div>
                    <span className="count-sty2">{cartQuantity}</span>
                    <div
                      onClick={() => setCartQuantity((prev) => prev + 1)}
                      className="minus-btn3"
                    >
                      +
                    </div>
                    <div className="add-to-cart" onClick={handleAddToCart}>
                      Add
                    </div>
                  </div>
                )}

                {/* ////////////////////////////////////////// */}

                {user && user.isAdmin && (
                  <Link className="link-none" to={`/product/${_id}/edit`}>
                    <div className="btn-edit">Edit</div>
                  </Link>
                )}
              </div>
            </>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ProductPreview;
