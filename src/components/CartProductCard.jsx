import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../features/products/productsSlice";
import Loader from "./Loader";
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
      getDoc(doc(db, "cart", cartId)).then((docSnap) => {
        if (docSnap.exists()) {
          let { items } = docSnap.data();

          items = items.filter((item) => item.product.id != id);

          if (items.length == 0) {
            deleteDoc(doc(db, "cart", cartId)).then(() => {
              // console.log("Their is no product left in the cart!");
            });
          } else if (items.length != 0) {
            updateDoc(doc(db, "cart", cartId), {
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
      getDoc(doc(db, "cart", cartId)).then((docSnap) => {
        if (docSnap.exists()) {
          let { items } = docSnap.data();

          items = items.map((item) => {
            if (item.product.id == id) {
              item = { ...item, quantity: qnt };
            }
            return item;
          });

          updateDoc(doc(db, "cart", cartId), {
            items,
          });
        }
      });
    }
  }, [qnt]);

  const { img, title, actualPrice, discountedPrice } = product.data;
  return (
    <>
      <div className="mt-5 cart-product-card d-flex flex-column  border shadow p-3 mb-5 bg-body rounded">
        <div className="product-details d-flex">
          <img
            src={img}
            alt={title}
            style={{ maxWidth: "150px", maxHeight: "150px" }}
          />
          <div className="product-infos-container d-flex ms-4 justify-content-between">
            <div className="product-info d-flex flex-column justify-content-evenly mt-2">
              <p className="product-title fw-semibold me-5">{title}</p>
              <p className="product-seller lead">
                Sold by <span className="fw-semibold">Aashir khan</span>
              </p>
              <p className="product-left-stocks lead text-danger fw-bold">
                Only 2 left in stock
              </p>
            </div>
            <div className="product-pricing">
              <p className="discounted-price mb-0">
                <sup>&#8377;</sup> {discountedPrice}
              </p>
              <small className="fs-6 discount-percentage mt-0">60 % OFF</small>
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
