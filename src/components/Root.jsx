import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authentication/userSlice";
import { selectAddress } from "../features/authentication/addressSlice";
import { selectProducts } from "../features/products/productsSlice";
import { ScrollRestoration } from "react-router-dom";

export default function Root() {
  return (
    <>
      <ScrollRestoration />

      <header className="container-fluid bg-light pt-3 pb-3 sticky-top">
        <Navbar />
      </header>
      <hr className="class-1" />

      <Outlet />
    </>
  );
}
