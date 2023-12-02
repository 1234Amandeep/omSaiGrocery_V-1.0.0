import React, { useEffect, useState, forceUpdate } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser, selectUser } from "../features/authentication/userSlice";
import {
  deleteDoc,
  doc,
  collection,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  setDoc,
  getCountFromServer,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { removeAddress } from "../features/authentication/addressSlice";
import productCollection from "../data/MOCK_DATA03.json";

export default function Navbar() {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    dispatch(removeUser());
    dispatch(removeAddress());
  };

  return (
    <>
      <nav className="container-lg navbar navbar-expand-lg bg-light ">
        <div className="container-fluid align-items-center">
          <Link className="navbar-brand brand-logo fw-bolder" to={"/"}>
            OM POOJA & DISPOSABLES
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"about"}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"search"}>
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"shop"}>
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"cart"}>
                  Cart
                </Link>
              </li>
              <li className="nav-item ps-3">
                {userData.user ? (
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                ) : (
                  <Link to={"login"}>
                    <button type="button" className="btn btn-dark">
                      Login
                    </button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

// <----------- ----------->
// const [testIds, setTestIds] = useState([]);
// const [isUpdated, setIsUpdated] = useState(false);

// const addDocsTest = () => {
//   // checking count of docs in db before adding new docs
//   let count = 0;

//   getCountFromServer(collection(db, "test")).then((c) => {
//     count = c.data().count;

//     if (count == 0) {
//       // adding docs
//       productCollection.forEach((doc) => {
//         addDoc(collection(db, "test"), doc).then((docRef) => {
//           setTestIds((testIds) => [...testIds, docRef.id]);
//         });
//       });
//     }
//   });
// };

// const updateDocs = () => {
//   if (testIds.length) {
//     testIds.forEach((id, i) => {
//       updateDoc(doc(db, "test", id), {
//         img: "https://firebasestorage.googleapis.com/v0/b/omsaigroceries-app.appspot.com/o/products-images%2Fkuttu-atta.webp?alt=media&token=a16ec595-3393-42ca-8efd-c6f12f042483",
//         actualPrice: 80,
//         discountedPrice: 55,
//       }).then(() => {
//         if (i + 1 == testIds.length) {
//           setIsUpdated(true);
//         }
//       });
//     });
//   }
// };

// const addProducts = () => {
//   let count;
//   getCountFromServer(collection(db, "products")).then((c) => {
//     count = c.data().count;

//     if (count == 20) {
//       // geeting all the docs from test collection
//       getDocs(collection(db, "test")).then((querySnapshot) => {
//         querySnapshot.forEach((document) => {
//           let id = document.id;
//           let docu = document.data();
//           setDoc(doc(db, "products", id), docu).then(() =>
//             console.log("Doc added!")
//           );
//         });
//         setIsUpdated(false);
//       });
//     }
//   });
// };

// useEffect(() => {
//   if (testIds.length == 0) {
//     // adding docs to test collection
//     addDocsTest();
//   }
// }, []);

// useEffect(() => {
//   if (testIds.length == productCollection.length) {
//     // updating docs of test collection
//     updateDocs();
//   }
// }, [testIds]);

// useEffect(() => {
//   if (isUpdated) {
//     // adding updated docs of test to products collection.
//     addProducts();
//   }
// }, [isUpdated]);

// // Changing pricing of 180 new products
// useEffect(() => {
//   const q = query(
//     collection(db, "products"),
//     where("discountedPrice", "==", 55)
//   );

//   getDocs(q).then((querySnapshot) => {
//     querySnapshot.forEach((document) => {
//       // [100, 350]
//       let dPrice = Math.round(Math.random() * (350 - 100) + 100);

//       updateDoc(doc(db, "products", document.id), {
//         discountedPrice: dPrice,
//         actualPrice: 400,
//       }).then(() => console.log("Doc updated!"));
//     });
//   });
// }, []);
