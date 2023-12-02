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

  const showAll = () => {
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
    const arr = products.filter(
      (product) => product.data.category == e.target.value
    );
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
              className="form-control"
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
          {/* </div> */}
          <div className="btns-container">
            <div className="btns-container-filter mb-2">
              {/* filter btns */}
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <button
                    value={category}
                    key={index}
                    className="btn-dark btn me-2 ms-2 mb-3"
                    onClick={(e) => handleFilter(e)}
                  >
                    {category}
                  </button>
                ))}
            </div>
            <div className="btns-container-sort d-flex justify-content-center">
              {/* sort btns */}
              <button
                className="btn-dark btn ms-2 me-2 mb-2"
                type="button"
                onClick={showAll}
              >
                show all
              </button>
              <button
                className="btn btn-dark ms-2 me-2 mb-2"
                value="low-to-high"
                type="button"
                onClick={(e) => handleSort(e)}
              >
                low to high
              </button>
              <button
                className="btn btn-dark ms-2 me-2 mb-2"
                value="high-to-low"
                type="button"
                onClick={(e) => handleSort(e)}
              >
                high to low
              </button>
            </div>
            {/* filter btns ends here */}

            {productShowcase.length != 0 &&
              productShowcase.map((product, index) => (
                <Link
                  to={`/shop/${product.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                  key={index}
                >
                  <div className="mt-5 cart-product-card d-flex flex-column  border shadow p-3 mb-5 bg-body rounded">
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
          </div>
          {/* Show either "Sorry we couldn't find the item you searched for" or the
          list of items which have matched the search...
          <div className="traceback-btn-container fixed-bottom d-flex justify-content-center mb-2">
            <TracebackBtn />
          </div> */}
        </div>
      </section>
    </>
  );
}
