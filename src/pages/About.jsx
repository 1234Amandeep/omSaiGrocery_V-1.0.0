import React from "react";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authentication/userSlice";

export default function About() {
  return (
    <>
      <section className="about-us container-fluid mt-5">
        <div className="container-lg d-flex flex-column align-items-center justify-content-center about-content">
          <h2 className="h2 fw-bolder about-title">About Us</h2>
          <p className="about-para mt-2">
            We are online service provider of Groceries, Vegetables and many
            more items with best price and quality at Rajnagar Extension
            Ghaziabad.
          </p>
        </div>
        <div className="about-footer fixed-bottom">
          <Footer />
        </div>
      </section>
    </>
  );
}
