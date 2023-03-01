import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  decreaseTCart,
  getTotals,
  removeFromCart,
} from "../features/cartSlice";

import "./CartPage.css";
const Cart = () => {
  const { cart, totalPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);
  const handleRemoveCart = (item) => {
    dispatch(removeFromCart(item));
  };
  const handleDecreaseCart = (item) => {
    dispatch(decreaseTCart(item));
  };
  const handleIncreaseCart = (item) => {
    dispatch(addProduct(item));
  };
  return (
    <Container style={{ minHeight: "95vh" }} className="cart-container">
      <Row>
        <Col>
          <h1 className="pt-2 h3">Shopping cart</h1>
        </Col>
        <Col md={5}>
          <>
            <Table responsive="sm" className="cart-table">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {/* loop through cart products */}
                {cart.map((item) => (
                  <tr>
                    <td>&nbsp;</td>
                    <td>
                      <i
                        onClick={() => handleRemoveCart(item)}
                        className="fa fa-times"
                        style={{ marginRight: 10, cursor: "pointer" }}
                      ></i>

                      <img
                        src={item.pictures[0].url}
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                    </td>
                    <td>{item.price}</td>
                    <td>
                      <span className="quantity-indicator">
                        <i
                          onClick={() => handleDecreaseCart(item)}
                          className="fa fa-minus-circle"
                        ></i>
                        <span>{item.cartQuantity}</span>
                        <i
                          onClick={() => handleIncreaseCart(item)}
                          className="fa fa-plus-circle"
                        ></i>
                      </span>
                    </td>
                    <td>{item.price * item.cartQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div>
              <h3 className="h4 pt-4">Total: {totalPrice}</h3>
            </div>
          </>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
