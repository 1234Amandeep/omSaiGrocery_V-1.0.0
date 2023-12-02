import React from "react";
import { Link } from "react-router-dom";

export default function TracebackBtn() {
  return (
    <>
      <Link to={"/"}>
        <button className="btn btn-outline-dark traceback-btn">Back</button>
      </Link>
    </>
  );
}
