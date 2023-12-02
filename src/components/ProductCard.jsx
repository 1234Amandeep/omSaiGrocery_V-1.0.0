import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ id, title, img, price }) {
  return (
    <>
      {!img ? (
        <Loader />
      ) : (
        <article className="container-fluid" key={id}>
          <div className=" container-lg product-card-container d-flex justify-content-center align-items-center">
            <Link to={id} style={{ textDecoration: "none", color: "#000" }}>
              <div className="card" style={{ width: "250px", height: "430px" }}>
                <img
                  src={img}
                  className="card-img-top product-img"
                  alt={title}
                  style={{ height: "250px" }}
                />
                <div className="card-body">
                  <small className="card-title">{title}</small>
                  <p className="pt-1 pb-2 fw-bold card-text product-price">
                    &#8377;{price}.00
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </article>
      )}
    </>
  );
}
