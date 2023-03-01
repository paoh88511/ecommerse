import axios from "../axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import "./CategoryPage.css";
import { useLocation } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
const CategoryPage = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  console.log(category);
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerpage, setPostPerpage] = useState(4);
  //////

  const [product, setProduct] = useState(null);

  console.log(product);
  // const [pages] = useState(Math.floor(products.length / postPerpage) + 1);

  // console.log(
  //   products.filter((product) => product.name.toLowerCase().includes("o"))
  // );
  ////////
  //Pagination
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
    console.log(pageNumber);
  }

  const startIndex = currentPage * postPerpage - postPerpage;
  const endIndex = startIndex + postPerpage;
  const pageLimit = 3;
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * currentPage;

    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  ////////
  // const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(category ? `/products/category/${category}` : "/products")
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  }, [category]);
  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);
  useEffect(() => {
    if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  if (loading) {
    <Loading />;
  }
  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function ProductSearch({ _id, category, name, pictures }) {
    return (
      <ProductPreview
        _id={_id}
        category={category}
        name={name}
        pictures={pictures}
      />
    );
  }
  return (
    <div className="category-page-container">
      {/* <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
      >
        <h1 className="text-center">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div> */}
      <div className="filter-group">
        <select
          className="filter-set"
          onChange={(e) => setSort(e.target.value)}
        >
          <option disabled selected>
            --View price--
          </option>
          <option value="asc">Price: Low to height</option>
          <option value="desc">Price: Height to low</option>
        </select>
        <div className="search-group">
          <div className="filter-set2">
            <div className="bi-searchAlt">
              <BiSearchAlt className="bi-searchAlt-icon" />
            </div>

            {/* <div className="filters-container d-flex justify-content-center pt-4 pb-4"> */}
            <input
              className="input-inline"
              type="search"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* {productsSearch.length === 0 ? (
        <h1>No products to show</h1>
      ) : (
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <Pagination
                data={productsSearch}
                RenderComponent={ProductSearch}
                pageLimit={1}
                dataLimit={5}
                tablePagination={false}
              />
            </Col>
          </Row>
        </Container>
      )} */}
      <div className="featured-products-container container mt-4">
        <div className="d-flex justify-content-center flex-wrap">
          {category
            ? filteredProducts
                .filter((product) =>
                  product.name
                    .toLowerCase()

                    .includes(searchTerm.toLowerCase())
                )
                .slice(startIndex, endIndex)
                .map((product) => <ProductPreview {...product} />)
            : products
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )

                .slice(startIndex, endIndex)
                .map((product) => <ProductPreview {...product} />)}
        </div>
      </div>
      {/* show the next and previous buttons */}
      {products.length > postPerpage && (
        <div className="pagination">
          <div
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          >
            <ArrowBackIosNewRoundedIcon className="navigateNextIcon" />
          </div>
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${
                currentPage === item ? "active" : ""
              }`}
            >
              <span>{item}</span>
            </button>
          ))}
          <div
            onClick={goToNextPage}
            // className={`next ${currentPage >= pages ? "disabled" : ""}`}
          >
            <ArrowForwardIosRoundedIcon className="navigateNextIcon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
