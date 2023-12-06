import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { selectProducts } from "../features/products/productsSlice";

export default function Shop() {
  const { products } = useSelector(selectProducts);

  return (
    <>
      {products.length == 0 ? (
        <Loader />
      ) : (
        <section className="products container-fluid">
          <div className="container-lg">
            <p className="h2 fw-bolder text-center mt-5">
              <u>Products List</u>
            </p>
            <div className="container text-center d-flex justify-content-center">
              {/* row gx-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 testing */}
              <div
                className="
              product-list-container
              "
              >
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    id={product.id}
                    title={product.data.title}
                    img={product.data.img}
                    price={product.data.discountedPrice}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
