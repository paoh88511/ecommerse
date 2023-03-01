import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "./DashboardProducts.css";
import Pagination from "./Pagination";

function DashboardProducts() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  // removing the product
  const [deletProduct, { isLoading }] = useDeleteProductMutation();
  function handleDeleteProduct(id) {
    // logic here
    if (window.confirm("Confirm to remove this item?"))
      deletProduct({ product_id: id, user_id: user._id });
  }

  function TableRow({ pictures, _id, name, price, stock }) {
    return (
      <tr>
        <td>
          <img src={pictures[0].url} className="dashboard-product-preview " />
        </td>
        <td>{_id}</td>
        <td>{name}</td>
        <td>${price}</td>
        <td>{stock}</td>

        <td>
          <div className="dash-btn-group">
            <Link className="btn btn-warning" to={`/product/${_id}/edit`}>
              Edit
            </Link>
            <button
              className="dash-del"
              onClick={() => handleDeleteProduct(_id, user._id)}
              disabled={isLoading}
            >
              Remove
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <Table className="tab">
      <thead>
        <tr>
          <th></th>
          <th>Image ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody className="table-content">
        <Pagination
          data={products}
          RenderComponent={TableRow}
          pageLimit={1}
          dataLimit={5}
          tablePagination={true}
        />
      </tbody>
    </Table>
  );
}

export default DashboardProducts;
