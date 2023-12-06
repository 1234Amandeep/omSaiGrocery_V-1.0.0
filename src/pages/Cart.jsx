import React from "react";
import { Link } from "react-router-dom";
import CartProductCard from "../components/CartProductCard";
import { useSelector } from "react-redux";
import { selectOrder } from "../features/purchaseOrder/orderSlice";
import Loader from "../components/Loader";
import { selectCart } from "../features/purchaseOrder/cartSlice";

export default function Cart() {
  const { cart } = useSelector(selectCart);

  // console.log("inside cart,");

  // console.log(cart[0].product);

  return (
    <>
      <p className="fs-2 text-center fw-bolder cart-heading mt-lg-5 m-3 ">
        Cart
      </p>
      <div className="cart-container d-flex flex-column ">
        <div className="cart-list-outer-container mb-5">
          <p className="fs-5 fw-bold text-center mb-4 mt-4">
            <u>Order Summary</u>
          </p>
          <div className="cart-list-container d-flex flex-column gap-5 mb-5">
            {cart.length == 0 ? (
              <p className="text-center fw-semibold pt-2 pb-2">cart is empty</p>
            ) : (
              cart.map((item, index) => {
                return <CartProductCard key={index} item={item} />;
              })
            )}
          </div>
        </div>
        <div className="btn-cont text-center">
          {cart.length == 0 ? (
            <Link to={"/shop"}>
              <button className="mb-5 btn  btn-outline-dark">
                Back to shop
              </button>
            </Link>
          ) : (
            <Link to={"/checkout"}>
              <button className="mb-5 btn  btn-outline-dark">
                Proceed to checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

/* <article className="cart-page-container container-fluid d-flex justify-content-center">
        <div className="container-lg d-flex justify-content-center flex-column align-items-center pt-5">
          <p className="fs-2 text-center fw-bolder cart-heading">Cart</p>
          <div className="cart-outer-container ">
            <div className="cart-inner-container mt-4  ms-5 mb-4 me-5">
              <p className="fs-5 fw-bold text-center">
                <u>Order Summary</u>
              </p>
              {cart.length == 0 ? (
                <p className="text-center fw-semibold pt-2 pb-2">
                  cart is empty
                </p>
              ) : (
                cart.map((item, index) => {
                  return <CartProductCard key={index} item={item} />;
                })
              )}
            </div>
          </div>
          {cart.length == 0 ? (
            <Link to={"/shop"}>
              <button className="mt-4 mb-5 btn  btn-outline-dark">
                Back to shop
              </button>
            </Link>
          ) : (
            <Link to={"/checkout"}>
              <button className="mt-4 mb-5 btn  btn-outline-dark">
                Proceed to checkout
              </button>
            </Link>
          )}
        </div>
      </article> */
