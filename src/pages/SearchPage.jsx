import React, { useEffect, useState } from "react";
import TracebackBtn from "../components/TracebackBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../features/products/productsSlice";
import Loader from "../components/Loader";

export default function SearchPage() {
  let { products } = useSelector(selectProducts);
  const [productShowcase, setProductShowcase] = useState([]);
  const [searchReq, setSearchReq] = useState("");
  const [categories, setCategories] = useState([]);
  const [sortList, setSortList] = useState([
    "show all",
    "low to high",
    "high to low",
  ]);

  const showAll = () => {
    console.log("inside show all");
    if (products.length != 0) {
      setProductShowcase(products);
    }
  };
  // sorting functions
  const handleSort = (e) => {
    const arrForSort = [...productShowcase];
    if (e.target.value == "low-to-high") {
      arrForSort.sort((a, b) => {
        return a.data.discountedPrice - b.data.discountedPrice;
      });
      setProductShowcase(arrForSort);
    } else {
      arrForSort.sort((a, b) => {
        return b.data.discountedPrice - a.data.discountedPrice;
      });
      setProductShowcase(arrForSort);
    }
  };

  const handleFilter = (e) => {
    const arr = products.filter((product) => {
      console.log(
        `e.target.value: ${e.target.value}, product.data.category: ${product.data.category}`
      );
      return product.data.category == e.target.value;
    });
    setProductShowcase(arr);
  };
  if (products.length == 0) {
    return <Loader />;
  } else {
    // adding categories in state.
    if (categories.length == 0) {
      let cats = products.map(function (product) {
        return product.data.category;
      });
      cats = cats.filter(function (v, i) {
        return cats.indexOf(v) == i;
      });
      setCategories(cats);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let search = e.target.search.value;

    let searchResult = [];
    products.forEach((product) => {
      let title = product.data.title;
      let flag = false;
      search.split(" ").forEach((searchWord) => {
        title.split(" ").forEach((titleWord) => {
          if (titleWord.toUpperCase() == searchWord.toUpperCase()) {
            searchResult.push(product);
            flag = true;
          } else if (!flag) {
            flag = false;
          }
        });
      });
      setSearchReq("");
    });

    function onlyUnique(value, index, array) {
      return array.indexOf(value) === index;
    }
    const uniqueSearchResult = searchResult.filter(onlyUnique);

    setProductShowcase(uniqueSearchResult);
  };
  return (
    <>
      <section className="container-fluid search ">
        {/* Make a workable history (traceback) button...*/}
        <div className="container-lg d-flex align-items-center justify-content-center flex-column">
          {/* add stateful login into this input feild.. when you have the access of products... */}
          <form
            onSubmit={handleSearch}
            className="input-group mb-3 searchbar mb-5"
          >
            <input
              required
              type="text"
              id="search"
              className="form-control search-input
               shadow-sm bg-body rounded
              "
              placeholder="Search for items..."
              aria-label="Search for items..."
              aria-describedby="basic-addon2"
              value={searchReq}
              onChange={(e) => setSearchReq(e.target.value)}
            />
            {/* Search btn */}
            <button
              type="submit"
              className="btn btn-outline-dark input-group-text search-btn"
              id="basic-addon2"
            >
              Search
            </button>
          </form>

          <div className="btns-container d-flex gap-2">
            {/* filter btns */}
            <div className="dropdown filter-btn">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                category
              </button>
              <ul className="dropdown-menu">
                {categories.length > 0 &&
                  categories.map((category, index) => (
                    <li key={index}>
                      <button
                        value={category}
                        type="button"
                        onClick={(e) => handleFilter(e)}
                        className="dropdown-item"
                      >
                        {category}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>

            {/* sort btns */}
            <div className="dropdown sort-btn">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                sort
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={showAll}
                  >
                    show all
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    value="low-to-high"
                    type="button"
                    onClick={(e) => handleSort(e)}
                  >
                    low to high
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    value="high-to-low"
                    type="button"
                    onClick={(e) => handleSort(e)}
                  >
                    high to low
                  </button>
                </li>
              </ul>
            </div>

            {/* filter btns ends here */}
          </div>

          {/* Search results container */}
          <div className="search-results-container mt-5 mb-4">
            {productShowcase.length != 0 &&
              productShowcase.map((product, index) => (
                <>
                  <Link
                    to={`/shop/${product.id}`}
                    className="search-card-container mb-5"
                    key={index}
                  >
                    <div
                      className="card result-card-container
                       border shadow p-3 mb-5 bg-body rounded
                      "
                      style={{
                        marginInline: "auto",
                        width: "min(90%, 60rem)",
                        marginBlock: "1.75rem",
                      }}
                    >
                      <img
                        src={product.data.img}
                        className="card-img-top result-card-img"
                        alt={product.data.title}
                      />
                      <div className="card-body result-card-body">
                        <h5 className="card-title result-card-title">
                          {product.data.title}
                        </h5>
                        <p className="card-text result-card-pricing">
                          <span className="me-2 fw-semibold">
                            $ {product.data.discountedPrice}
                          </span>
                          <span className="text-success">60% OFF</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </>
              ))}
          </div>
          {/* Show either "Sorry we couldn't find the item you searched for" or the
          list of items which have matched the search...
          <div className="traceback-btn-container fixed-bottom d-flex justify-content-center mb-2">
            <TracebackBtn />
          </div> */}

          {/* *** */}
          {/* 
          {productShowcase.length != 0 &&
              productShowcase.map((product, index) => (
                <Link
                  to={`/shop/${product.id}`}
                  key={index}
                  className="search-result-card"
                >
                  <div className="search-result-card mt-5 cart-product-card d-flex flex-column  border shadow p-3 mb-5 bg-body rounded">
                    <div className="product-details d-flex">
                      <img
                        src={product.data.img}
                        alt={product.data.title}
                        style={{ maxWidth: "150px", maxHeight: "150px" }}
                      />
                      <div className="product-infos-container d-flex ms-4 justify-content-between">
                        <div className="product-info d-flex flex-column justify-content-evenly mt-2">
                          <p className="product-title fw-semibold me-5">
                            {product.data.title}
                          </p>
                          <p className="product-seller lead">
                            Sold by{" "}
                            <span className="fw-semibold">Aashir khan</span>
                          </p>
                          <p className="product-left-stocks lead text-danger fw-bold">
                            Only 2 left in stock
                          </p>
                        </div>
                        <div className="product-pricing">
                          <p className="discounted-price mb-0">
                            <sup>$</sup> {product.data.discountedPrice}
                          </p>
                          <small className="fs-6 discount-percentage mt-0">
                            60 % OFF
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        */}
        </div>
      </section>
    </>
  );
}
