import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, selectUser } from "../features/authentication/userSlice";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { addAddress } from "../features/authentication/addressSlice";

export const useLogin = () => {
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Could not complete signup");
      }
      const user = res.user;
      const { displayName, email, photoURL, uid } = user;

      dispatch(
        addUser({
          displayName,
          email,
          photoURL,
          uid,
        })
      );
      console.log("user added.");
      setIsPending(false);
      getDoc(doc(db, "addresses", uid))
        .then((snapshot) => {
          if (!snapshot.data()) {
            navigate("/form-address");
            navigate(0);
          } else {
            navigate("/");
            navigate(0);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};
