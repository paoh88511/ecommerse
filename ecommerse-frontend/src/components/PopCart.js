import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  decreaseTCart,
  getTotals,
  removeFromCart,
} from "../features/cartSlice";
import "./PopCart.css";

function PopCart({ closeModal }) {
  const [show, setShow] = useState(true);

  const { cart, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);
  const handleRemoveCart = (item) => {
    dispatch(removeFromCart(item));
  };
  const handleDecreaseToCart = (item) => {
    dispatch(decreaseTCart(item));
  };
  const handleIncreaseToCart = (item) => {
    dispatch(addProduct(item));
  };
  return (
    <Modal
      backdrop={false}
      show={show}
      animation={false}
      className=" modal-all"
    >
      <div className="modal-diagloud2">
        <Modal.Header backdrop={false} className="modale-header-sty">
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
                      <td>
                        <img
                          className="img-margin-right"
                          src={item.pictures[0].url}
                          style={{ width: 80, height: 80, objectFit: "cover" }}
                        />
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <span className="quantity-indicator">
                          <button
                            onClick={() => handleDecreaseToCart(item)}
                            className="add-btn"
                          >
                            -
                          </button>
                          <span className="crart-quinity">
                            {item.cartQuantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseToCart(item)}
                            className="minus-btn"
                          >
                            +
                          </button>
                        </span>
                        <p
                          className="remove-btn"
                          onClick={() => handleRemoveCart(item)}
                          // className="fa fa-times"
                          style={{ marginRight: 10, cursor: "pointer" }}
                        >
                          Remove
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
          <div>
            <h3 className="total-feedback2">Subtatol: ${totalPrice}</h3>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="checkout-btn">Check Out</button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default PopCart;
