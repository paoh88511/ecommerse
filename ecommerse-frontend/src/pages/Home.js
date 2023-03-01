import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  //const lastProducts = products.slice(0.8);
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div className="all">
      <img className="home-banner" />
      <div className="featured-products-container container mt-4">
        <h2 className="home-tiltle">New products</h2>
        {/* last products here */}
        <div className="d-flex justify-content-center flex-wrap">
          {products.slice(0, 4).map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>

        <Link
          to="/category/all"
          style={{
            textAlign: "center",
            display: "block",

            textDecoration: "none",
          }}
        >
          <h1 className="see-more">Load more</h1>
        </Link>
      </div>
    </div>
  );
};

export default Home;
