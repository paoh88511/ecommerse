import React, { useState } from "react";
import { Form, Modal, ModalFooter, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useDecreaseCartProductMutation,
  useIncreaseCartProductMutation,
  useRemoveFromCartMutation,
} from "../services/appApi";
import "./PopModal.css";

const PopModal = ({ closeModal }) => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  console.log(userCartObj);
  const [show, setShow] = useState(true);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
  /////
  const [formVal, setFormVal] = useState([{ name: "" }]);
  const onHandle = (e, i) => {
    let newForm = [...formVal];
    newForm[i][e.target.name] = e.target.value;
    setFormVal(newForm);
  };

  const formValidation = (formVal) => {
    const data = [...formVal];

    let valid = true;
    // let num = user.cart.total * 0.9 + user.cart.total * 0.1;
    let num = user.cart.total;
    let estimate = (num - num * 0.2) | 0;

    for (let index = 0; index < data.length; index++) {
      // const element = data[index];
      if (data[index].name == "0323") {
        data[index].nameCheck = `Estimate Total: $${estimate}`;
        data[index].nameCheck2 = `Discount: -$${(num - estimate) | 0}`;
        data[index].nameLengthCheck = "";
        valid = false;
      } else if (data[index].name !== "0323") {
        data[index].nameLengthCheck = "Please enter correct discount code !";
        data[index].nameCheck = "";
        data[index].nameCheck2 = "";
        valid = false;
      } else {
        data[index].nameCheck = "";
        data[index].nameLengthCheck = "";
        valid = true;
      }
    }
    setFormVal(data);
    return valid;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitData", formVal);
    const errorRes = formValidation(formVal);
    console.log("errorRes", errorRes);
    if (errorRes) {
      // api call
    } else {
      // error msg
    }
  };

  //////

  function handleDecrease(product) {
    const quantity = user.cart.count;

    if (quantity <= 0) return;
    decreaseCart(product);
  }

  return (
    <>
      <Modal backdrop={false} show={show} animation={false}>
        <div className="modal-diagloud">
          <Modal.Header className="modale-header-sty">
            <Modal.Title className="modal-title-sty">Shopping Cart</Modal.Title>
            <button className="close-btn" onClick={() => closeModal(false)}>
              X
            </button>
          </Modal.Header>
          <Modal.Body>
            <>
              {cart.length == 0 ? (
                <div className="cart-empty-message">
                  Your shopping cart is empty now...
                </div>
              ) : (
                <Table className="cart-table">
                  <tbody>
                    {/* loop through cart products */}
                    {cart.map((item) => (
                      <tr>
                        <td>&nbsp;</td>
                        <td>
                          <img
                            src={item.pictures[0].url}
                            style={{
                              width: 80,
                              height: 80,
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>${item.price}</td>
                        <td>
                          <span className="quantity-indicator">
                            <button
                              className="add-btn"
                              // className="fa fa-minus-circle"
                              onClick={() =>
                                handleDecrease({
                                  productId: item._id,
                                  price: item.price,
                                  stock: item.stock,
                                  userId: user._id,
                                })
                              }
                            >
                              -
                            </button>
                            <span className="crart-quinity">
                              {user.cart[item._id]}
                            </span>
                            <button
                              // className="fa fa-plus-circle"
                              className="minus-btn"
                              onClick={() =>
                                increaseCart({
                                  productId: item._id,
                                  price: item.price,
                                  stock: item.stock,

                                  userId: user._id,
                                })
                              }
                            >
                              +
                            </button>
                          </span>
                          <div>
                            {!isLoading && (
                              <p
                                className="remove-btn"
                                // className="fa fa-times"
                                style={{ marginRight: 10, cursor: "pointer" }}
                                onClick={() =>
                                  removeFromCart({
                                    productId: item._id,
                                    price: item.price,
                                    userId: user._id,
                                  })
                                }
                              >
                                Remove
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
            <>
              {formVal.map((item, i) => (
                <Form onSubmit={onSubmit}>
                  {/* {formVal.map((item, i) => ( */}
                  <>
                    {cart.length == 0 ? (
                      ""
                    ) : (
                      <div className="apply-group">
                        <input
                          className="coup-code"
                          type="text"
                          name="name"
                          placeholder="20% OFF"
                          value={item.name || ""}
                          onChange={(e) => onHandle(e, i)}
                        />

                        <button
                          className="apply-btn"
                          type="submit"
                          style={{ marginLeft: "20px" }}
                        >
                          Apply
                        </button>

                        <p className="wrong-discount">{item.nameLengthCheck}</p>
                      </div>
                    )}
                  </>
                  <div className="al-total">
                    <h3 className="total-feedback">
                      {/* Subtotal: ${user.cart.total + user.cart.total * 0.1} */}
                      Subtotal: ${user.cart.total}
                    </h3>
                    {cart.length == 0 ? (
                      ""
                    ) : (
                      <>
                        <h3 className="total-feedback">{item.nameCheck2}</h3>
                        <h3 className="total-feedback">{item.nameCheck}</h3>
                      </>
                    )}
                  </div>
                </Form>
              ))}
            </>
          </Modal.Body>
          <ModalFooter>
            <button className="checkout-btn">Checkout</button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
};

export default PopModal;
