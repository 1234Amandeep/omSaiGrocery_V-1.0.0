import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../features/products/productsSlice";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import {
  clearCart,
  selectCart,
  updateQnt,
} from "../features/purchaseOrder/cartSlice";
import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { selectCartId } from "../features/purchaseOrder/cartIdSlice";
import { db } from "../firebase";

export default function CartProductCard({ item }) {
  const dispatch = useDispatch();
  const { product, quantity } = item;
  const [qnt, setQnt] = useState(quantity);
  const { cartId } = useSelector(selectCartId);
  const { cart } = useSelector(selectCart);

  useEffect(() => {
    setQnt(quantity);
  }, [cart]);

  useEffect(() => {
    const id = product.id;
    // want to remove that item from cart completely.
    if (qnt == 0) {
      dispatch(clearCart(id));

      //removing item from db_cart.
      getDoc(doc(db, "carts", cartId)).then((docSnap) => {
        if (docSnap.exists()) {
          let { items } = docSnap.data();

          items = items.filter((item) => item.product.id != id);

          if (items.length == 0) {
            deleteDoc(doc(db, "carts", cartId)).then(() => {
              // console.log("Their is no product left in the cart!");
            });
          } else if (items.length != 0) {
            updateDoc(doc(db, "carts", cartId), {
              items,
            }).then(() => {
              // console.log("One item removed from cart");
            });
          }
        }
      });
    } else if (qnt != quantity) {
      dispatch(updateQnt({ id, qnt }));

      // updating quantity of db_cart item
      getDoc(doc(db, "carts", cartId)).then((docSnap) => {
        if (docSnap.exists()) {
          let { items } = docSnap.data();

          items = items.map((item) => {
            if (item.product.id == id) {
              item = { ...item, quantity: qnt };
            }
            return item;
          });

          updateDoc(doc(db, "carts", cartId), {
            items,
          });
        }
      });
    }
  }, [qnt]);

  let { img, title, actualPrice, discountedPrice } = product.data;

  return (
    <>
      {console.log("inside cartproductcard")}
      <div className=" cart-product-card p-2 d-flex flex-column  border shadow  bg-body rounded">
        <div className="product-details d-flex gap-3">
          <img
            src={img}
            alt={title}
            style={{ maxWidth: "150px", maxHeight: "150px" }}
          />
          <div className="product-infos-container d-flex  justify-content-start">
            <div className="product-info d-flex flex-column justify-content-evenly mt-2">
              <p className="product-title fw-semibold ">{title}</p>

              <div className="product-pricing">
                <p className="discounted-price mb-0 fw-semibold">
                  &#8377; {discountedPrice}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="btn-container mt-3 d-flex justify-content-between ms-3 me-3">
          <button
            onClick={() => setQnt(0)}
            type="button"
            className="btn btn-outline-danger btn-sm"
          >
            remove
          </button>
          <form>
            <button
              type="button"
              onClick={() => setQnt((qnt) => qnt - 1)}
              className="btn-sm btn btn-outline-dark me-2"
            >
              -
            </button>
            {qnt}
            <button
              type="button"
              onClick={() => setQnt((qnt) => qnt + 1)}
              className="btn-sm btn btn-outline-dark ms-2"
            >
              +
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
