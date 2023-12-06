import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./pages/Cart";
import Root from "./components/Root";
import {
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import colRef from "./firebase";
import About from "./pages/About";
import "./style.css";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import Shop from "./pages/Shop";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "./features/products/productsSlice";
import AddressForm from "./pages/AddressForm";
import { selectUser } from "./features/authentication/userSlice";
import {
  addAddress,
  selectAddress,
} from "./features/authentication/addressSlice";
import { collection } from "firebase/firestore";
import { db } from "./firebase";
import Checkout from "./pages/Checkout";
import { setCartId } from "./features/purchaseOrder/cartIdSlice";
import { setCart } from "./features/purchaseOrder/cartSlice";

function App() {
  const dispatch = useDispatch();
  const userAddress = useSelector(selectAddress);
  const userData = useSelector(selectUser);

  useEffect(() => {
    const colRef = collection(db, "addresses");
    if (userAddress.address) {
      getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {});
      });
    }
  }, [userAddress.address]);

  useEffect(() => {
    if (userData.user) {
      // adding address in store
      const docRef = doc(db, "addresses", userData.user.id);
      getDoc(docRef).then((snapshot) => {
        dispatch(addAddress(snapshot.data()));
      });

      // adding cartId and cart to store
      let count;
      getCountFromServer(collection(db, "cart")).then((c) => {
        count = c.data().count;

        if (count) {
          getDocs(collection(db, "cart")).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // adding cartId to store
              dispatch(setCartId(doc.id));

              // adding cart to store
              dispatch(setCart(doc.data()));
            });
          });
        } else if (count == 0) {
          dispatch(setCartId(""));
          dispatch(
            setCart({
              items: [],
            })
          );
        }
      });
    }
  }, [userData.user]);

  // Reading data from firestore
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "asc"));

    getDocs(q)
      .then((snapshot) => {
        snapshot.docs.forEach((doc, index) => {
          let data = doc.data();
          let price = data.price;
          let id = doc.id;
          dispatch(
            addProduct({
              id,
              data,
              price,
            })
          );
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        // default children if nothing matches in children then home will be the outlet...
        // home element will be the outlet if route path is "/" only.
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "form-address",
          element: <AddressForm />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "search",
          element: <SearchPage />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "shop",
          element: <Shop />,
        },
        {
          path: "success",
          element: <Success />,
        },
        {
          path: "cancel",
          element: <Cancel />,
        },
        {
          path: "shop/:id",
          element: <ProductDetailsPage />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
