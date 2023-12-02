import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/authentication/userSlice";
import {
  addAddress,
  selectAddress,
} from "../features/authentication/addressSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AddressForm() {
  const userData = useSelector(selectUser);
  const userAddress = useSelector(selectAddress);
  const [flatAdd, setFlatAdd] = useState("");
  const [blockAdd, setBlockAdd] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const uid = userData.user.id;
    const data = {
      userId: uid,
      userAddress: {
        flatNo: flatAdd,
        Block: blockAdd,
      },
    };

    const docRef = doc(db, "addresses", data.userId);
    setDoc(docRef, data.userAddress).then(() => {
      console.log("Document added to db.");
    });
    dispatch(addAddress(data));

    setFlatAdd("");
    setBlockAdd("");
    navigate("/checkout");
    navigate(0);
  };

  useEffect(() => {}, []);
  return (
    <>
      <article className="container-fluid ">
        <div className="address-form-container container-lg d-flex justify-content-center">
          <form className="address-form mt-5" onSubmit={submitHandler}>
            <div className="input-group">
              <span className="input-group-text">Flat no. & Block</span>
              <input
                type="text"
                aria-label="Flat no."
                className="form-control"
                name="flat-address"
                onChange={(e) => setFlatAdd(e.target.value)}
                value={flatAdd}
              />
              <input
                type="text"
                aria-label="Block"
                className="form-control"
                name="block-address"
                onChange={(e) => setBlockAdd(e.target.value)}
                value={blockAdd}
              />
            </div>
            <div className="btn-container justify-content-center d-flex">
              <button className="btn btn-dark" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </article>
    </>
  );
}
