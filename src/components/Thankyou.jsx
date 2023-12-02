import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { uid } from "uid";
import { selectCart, emptyCart } from "../features/purchaseOrder/cartSlice";
import getStripe from "../../lib/getStripe";
import { selectProducts } from "../features/products/productsSlice";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { selectCartId } from "../features/purchaseOrder/cartIdSlice";
import { db } from "../firebase";

export default function Thankyou() {
  let orderId = uid(16);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector(selectCart);
  const { cartId } = useSelector(selectCartId);

  const lineItems = [];

  if (cart.length != 0) {
    cart.forEach((item) => {
      const price = item.price;
      const quantity = item.quantity;

      lineItems.push({
        price,
        quantity,
      });
    });
  }

  // const handleClick = async () => {
  //   // add payment gateway
  //   dispatch(clearCart());
  //   const stripe = await getStripe();
  //   const { error } = await stripe.redirectToCheckout({
  //     lineItems: lineItems,
  //     mode: "payment",
  //     successUrl: `http://localhost:5173/success`,
  //     cancelUrl: `http://localhost:5173/cancel`,
  //     customerEmail: "a.d.scr71234@gmail.com",
  //   });
  //   console.warn(error.message);
  // };

  const handleClick = () => {
    dispatch(emptyCart());
    // updateDoc(doc(db, "cart", cartId), {
    //   items: [],
    // }).then(() => console.log("cart cleared!"));

    deleteDoc(doc(db, "cart", cartId)).then(() => console.log("doc deleted!"));
  };

  const handleRedirect = () => {
    navigate("/shop");
    navigate(0);
  };

  return (
    <>
      <div className="checkout-btn-container d-flex justify-content-center mb-5">
        <button
          onClick={handleClick}
          type="button"
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Proceed to Payements
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Order Placed!
              </h1>
            </div>
            <div className="modal-body">
              Thankyou for purchasing from us your order id:{" "}
              <span className="fw-bolder text-dark  ">
                <u>{orderId}</u>
              </span>
            </div>
            <div className="modal-footer">
              <Link to={"/"}>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Home
                </button>
              </Link>

              <button
                type="button"
                onClick={handleRedirect}
                className="btn btn-dark"
              >
                Shop More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
