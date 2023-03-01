import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Col, Container, Row } from "react-bootstrap";
import "react-alice-carousel/lib/alice-carousel.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
// import SimilarProduct from "../components/SimilarProduct";
import "./ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import {
  useAddToCartMutation,
  useDecreaseCartProductMutation,
} from "../services/appApi";
import { addToProduct } from "../features/cartSlice";
// import ToastMessage from "../components/ToastMessage";
const ProductPage = () => {
  const dispatch = useDispatch();
  const [cartQuantity, setCartQuantity] = useState(0);

  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();

  console.log(product);
  const handleDragStart = (e) => e.preventDefault();
  function handleDecrease(product) {
    const quantity = user.cart.count;
    if (quantity <= 0) {
      return alert("Already 0");
    }

    decreaseCart(product);
  }
  useEffect(() => {
    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
      // setSimilar(data.similar);
    });
  }, [id]);

  if (!product) {
    return <Loading />;
  }
  const images = product.pictures.map((picture) => (
    <img
      className="product__carousel--image"
      src={picture.url}
      onDragStart={handleDragStart}
    />
  ));

  return (
    <Container className="pt-4 mar-container" style={{ position: "relative" }}>
      <Row>
        <Col lg={6} className="pt-4">
          <AliceCarousel
            mouseTracking
            items={images}
            controlsStrategy="alternate"
          />
        </Col>
        <Col lg={6} className="pt-4">
          <div className="product-content">
            <p className="font-category">{product.category}</p>
            <h1 className="font-name">{product.name}</h1>
            <p className="product__price">${product.price}</p>
            <>
              {!user && (
                <div style={{ textAlign: "justify" }}>
                  {product.stock - cartQuantity <= 0 ? (
                    <>
                      <h1 className=" py3-stock">out of stock</h1>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </>
            {user && (
              <div style={{ textAlign: "justify" }}>
                {product.stock - user.cart[product._id] <= 0 ? (
                  <>
                    <h1 className=" py3-stock">out of stock</h1>
                  </>
                ) : (
                  ""
                )}
              </div>
            )}
            <div className="margin-bt">
              <p style={{ textAlign: "justify" }} className="py-3 py-des">
                {/* <strong>Description: </strong> */}
                {product.description}
              </p>

              {user && (
                <div>
                  <div
                    className="add-btn3"
                    onClick={() =>
                      handleDecrease({
                        userId: user._id,
                        productId: id,
                        price: product.price,
                        image: product.pictures[0].url,
                      })
                    }
                  >
                    -
                  </div>
                  <span className="count-sty1">{user.cart[product._id]}</span>
                  <div
                    className="minus-btn3"
                    onClick={() =>
                      addToCart({
                        userId: user._id,
                        productId: id,
                        price: product.price,
                        image: product.pictures[0].url,
                      })
                    }
                  >
                    +
                  </div>
                </div>
              )}
              {/* /////////////////////USERADMIN///////////////////////////////*/}
              {!user && (
                <div className="product-page-all-btn">
                  <div className="productpage-btn-group">
                    <div
                      className="add-btn3"
                      //  onClick={() => handleQuantity("dec")}
                      onClick={() =>
                        setCartQuantity((prev) => (prev == 0 ? 0 : prev - 1))
                      }
                    >
                      -
                    </div>

                    <span className="count-sty1">{cartQuantity}</span>
                    {/* <Button onClick={handleAddToCart}>Add</Button> */}
                    <div
                      className="minus-btn3"
                      onClick={() => setCartQuantity((prev) => prev + 1)}
                    >
                      +
                    </div>

                    <div
                      className="add-to-cart3"
                      onClick={() =>
                        dispatch(
                          addToProduct({
                            ...product,
                            cartQuantity,
                          })
                        )
                      }
                    >
                      Add
                    </div>
                  </div>
                </div>
              )}

              {/*///////////////////////////////////////////////////  */}
              {user && user.isAdmin && (
                <LinkContainer to={`/product/${product._id}/edit`}>
                  <div className="btn-edit2">Edit</div>
                </LinkContainer>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
