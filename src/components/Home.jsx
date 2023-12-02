import React from "react";

export default function Home() {
  return (
    <>
      <section className="heroku container-lg d-flex justify-content-center align-items-center flex-column mb-3">
        <div className="heroku-img mb-2">
          <img
            src="./src/assets/images/dAAfqNsY.jpeg"
            alt="heroku-img"
            className="heroku-img"
          />
        </div>
        <div className="heroku-title">
          <p className="h4 fw-bolder font-monospace">OM POOJA & DISPOSABLES</p>
        </div>
        <div className="heroku-para  lh-sm mb-3">
          We are online service provider of Pooja & Disposable items with best
          price and quality at Rajnagar Extension Ghaziabad.
        </div>
        <button type="button" className="btn btn-dark btn-sm">
          <span className="fw-semibold">Shop Now</span>
        </button>
      </section>
    </>
  );
}
