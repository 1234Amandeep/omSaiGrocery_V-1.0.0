import React from "react";

export default function Footer() {
  return (
    <>
      <hr className="class-1" />
      <footer className="container-fluid pt-3 ">
        <div className="container-lg d-flex flex-column justify-content-center align-items-center footer-content mb-3">
          <div className="footer-title mb-3 mt-3 fw-bold h5 text-center">
            Shop Safely and Securely
          </div>
          <div className="footer para mb-2 text-center">
            <address>
              <span className="fw-bold">Address :- </span>
              <small>Rajnagar Extension SCC SHAPHIRE SOCIETY SHOP NO - 1</small>
            </address>
          </div>
          <div className="footer-logo mb-2 text-center">
            <p className="h5 fw-bolder ">OM POOJA & DISPOSABLES</p>
          </div>
        </div>
        <div className="container-lg footer-trivial-info mb-3 d-flex justify-content-between text-center">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
          <span>Shipping & Payment Policy</span>
        </div>
      </footer>
    </>
  );
}
