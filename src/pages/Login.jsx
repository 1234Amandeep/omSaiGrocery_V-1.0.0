import React, { useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authentication/userSlice";
import { useNavigate } from "react-router-dom";

// start from learning how to login , logout, signup, how to use the uid of user to make his address doc. and save it on db...

export default function Login() {
  const { login, isPending } = useLogin();

  return (
    <>
      <article className="login container-fluid">
        <div className="container mt-5">
          <button
            className="btn btn-outline-dark"
            type="button"
            onClick={login}
          >
            {isPending ? "Loading..." : "Log in"}
          </button>
        </div>
      </article>
    </>
  );
}
