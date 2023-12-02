import React, { useState } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/authentication/userSlice";
import { selectAddress } from "../features/authentication/addressSlice";
import { addOrder } from "../features/purchaseOrder/orderSlice";
import { selectProducts } from "../features/products/productsSlice";
// import { selectCartId } from "../features/purchaseOrder/cartSlice";
import Loader from "../components/Loader";
import { addNewQnt, addToCart } from "../features/purchaseOrder/cartSlice";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  getCountFromServer,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { setCartId, selectCartId } from "../features/purchaseOrder/cartIdSlice";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { user } = useSelector(selectUser);
  const { address } = useSelector(selectAddress);
  const { products } = useSelector(selectProducts);
  const { cartId } = useSelector(selectCartId);

  let product;
  let price;

  if (products.length > 0) {
    [product] = products.filter((item) => item.id == id);
    price = product.price;
  } else {
    return <Loader />;
  }

  const handlePurchaseReq = () => {
    if (!user) {
      navigate("/login");
    } else if (user && !address) {
      navigate("/form-address");
    } else {
      // getDoc(doc(db, "cart", cartId)).then((docSnap) => {
      //   if (docSnap.exists()) {
      //     let { items } = docSnap.data();

      //     items.forEach((item) => {
      //       if (id == item.product.id) {
      //         console.log("Product already exists in cart: ");
      //       } else {
      //         console.log("product added for the first time!");
      //       }
      //     });
      //   }
      // });

      dispatch(addToCart({ product, quantity }));

      getCountFromServer(collection(db, "cart")).then((c) => {
        let count = c.data().count;

        if (count == 0) {
          console.log("inside if");
          //creating new collection "cart" and adding doc.
          addDoc(collection(db, "cart"), {
            items: [
              {
                product,
                quantity,
              },
            ],
          }).then((docRef) => {
            console.log("doc added to cart! ", docRef.id);
            dispatch(setCartId(docRef.id));
          });
        } else {
          // adding another item inside cart collection.

          getDoc(doc(db, "cart", cartId)).then((docSnap) => {
            if (docSnap.exists()) {
              let { items } = docSnap.data();

              for (let i = 0; i < items.length; i++) {
                if (id == items[i].product.id) {
                  console.log("Product already exists in cart: ");

                  let addOnQnt = quantity;
                  let existingQnt = items[i].quantity;

                  let itemDiff = {
                    ...items[i],
                    quantity: addOnQnt + existingQnt,
                  };
                  console.log("item  if already exits: ", itemDiff);

                  console.log("before, items.length: ", items.length);
                  items = items.map((item) => {
                    if (id == item.product.id) {
                      return itemDiff;
                    }

                    return item;
                  });
                  console.log("after, items.length: ", items.length);

                  dispatch(addNewQnt(items));
                  updateDoc(doc(db, "cart", cartId), {
                    items,
                  }).then(() => {});

                  break;
                } else {
                  items = [
                    ...items,
                    {
                      product,
                      quantity,
                    },
                  ];
                  console.log("adding new product to cart");
                  updateDoc(doc(db, "cart", cartId), {
                    items,
                  }).then(() => {});
                }
              }

              // Testing ends here!

              // updateDoc(doc(db, "cart", cartId), {
              //   items: [
              //     ...items,
              //     {
              //       product,
              //       quantity,
              //     },
              //   ],
              // }).then(() => {});
            }
          });
        }
      });

      navigate("/cart");
    }
  };

  return (
    <>
      <article className="container-fluid product-details-page">
        <div className="container-lg product-details-container d-flex mt-5 justify-content-start mb-5">
          <img
            src={product.data.img}
            alt={product.data.img}
            className="product-img"
          />

          <div className="product-infos d-flex flex-column">
            <p className="product-title fw-bolder">{product.data.title}</p>
            <div className="product-pricings d-flex">
              <span className="discounted-price">
                <mark className="fw-semibold">
                  &#8377;{product.data.discountedPrice}.00
                </mark>
              </span>
              <span className="actual-price text-muted">
                <s>&#8377;{product.data.actualPrice}.00</s>
              </span>
              <small className="discount-percent d-flex align-items-center">
                {Math.trunc(
                  ((product.data.actualPrice - product.data.discountedPrice) /
                    product.data.actualPrice) *
                    100
                )}
                % OFF
              </small>
            </div>
            <div className="order-misc-details mt-4">
              <small className="">hurray!!! Free Delivery</small>
              <div className="qnt-btn-container mt-3 d-flex align-items-center">
                <div className="quantity-feature-container">
                  <label htmlFor="qnt">Qnt :</label>
                  <span className="ms-2 btn-container mt-0">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark btn-minus me-2"
                      onClick={() =>
                        quantity == 1
                          ? setQuantity(1)
                          : setQuantity((quantity) => quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="quantity" id="quantity">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark btn-plus ms-2"
                      onClick={() => setQuantity((quantity) => quantity + 1)}
                    >
                      +
                    </button>
                  </span>
                </div>
              </div>
              <div className="btn-container d-flex justify-content-around">
                <button className="btn btn-outline-dark add-to-cart">
                  Add to Cart
                </button>

                <button
                  className="btn btn-dark buy-now"
                  onClick={() => handlePurchaseReq()}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </article>
    </>
  );
}
