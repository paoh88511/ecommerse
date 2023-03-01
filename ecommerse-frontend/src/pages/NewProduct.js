import React, { useState } from "react";
import "./NewProduct.css";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "../axios";
import { FaRegImages } from "react-icons/fa";
const NewProduct = () => {
  const [stock, setStock] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgRemove, setImgRemove] = useState(null);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();
  const handleRemoveImg = (imgObj) => {
    setImgRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !category ||
      !images.length
    ) {
      setErr(true);
    }
    createProduct({ name, description, price, stock, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    );
  };

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dmwjcjyfb",
        uploadPreset: "hq1pa6vy",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }
  return (
    <div className="body">
      <Container>
        <Row className="all-container">
          <Col md={6} className="new-product__form--container">
            <h1 className="mt-4-1">Create a product</h1>
            <Form className="form-all" onSubmit={handleSubmit}>
              {isSuccess && (
                <Alert variant="success">Product create successful!</Alert>
              )}
              {/* {isError && <Alert variant="danger">{error.data}</Alert>} */}
              <div className="form-group-item">
                <Form.Group className="mb-3">
                  <Form.Label className="lable-text">Product name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {err && name.length <= 0 ? (
                    <p className="err-mess-sent">Please enter product name</p>
                  ) : (
                    ""
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="lable-text">
                    Product description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Product description..."
                    style={{ height: "100px" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {err && description.length <= 0 ? (
                    <p className="err-mess-sent">
                      Please enter product description
                    </p>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <div className="category-price">
                  <Form.Group className="mb-cat">
                    <Form.Label className="lable-text">Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Quaility"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                    {err && stock.length <= 0 ? (
                      <p className="err-mess-sent">Please enter quantity </p>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                  <Form.Group className="mb-pri">
                    <Form.Label className="lable-text">Price($)</Form.Label>
                    <Form.Control
                      className="price-control2"
                      type="number"
                      placeholder="Price ($)"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    {err && price.length <= 0 ? (
                      <p className="err-mess-sent">Please enter price </p>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                </div>
                <Form.Group
                  className="mb-3"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <Form.Label className="lable-text">Category</Form.Label>
                  <Form.Select className="lable-text">
                    <option disabled selected>
                      -- --
                    </option>
                    <option value="Category1">Category1</option>
                    <option value="Category2">Category2</option>
                    <option value="Category3">Category3</option>
                    <option value="Category4">Category4</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 mb-btn">
                  <div className="images-preview-container">
                    <>
                      {images.length == 0 ? (
                        <>
                          <FaRegImages className="faRegImages" />
                        </>
                      ) : (
                        <>
                          {images.map((image) => (
                            <div className="image-preview">
                              <img src={image.url} />

                              {/* add removing */}
                              <i
                                className="fa fa-times-circle"
                                onClick={() => handleRemoveImg(image)}
                              ></i>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  </div>
                  <button
                    className="upload-imges"
                    type="button"
                    disabled={isLoading || isSuccess}
                    onClick={showWidget}
                  >
                    Upload Images
                  </button>
                </Form.Group>
                <Form.Group className="mb-3">
                  <button
                    className="create-primary"
                    type="submit"
                    disabled={isLoading || isSuccess}
                  >
                    Create
                  </button>
                </Form.Group>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewProduct;
