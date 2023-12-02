import React from "react";
import { Waveform } from "@uiball/loaders";

export default function Loader() {
  return (
    <>
      <article
        className="container-fluid loader-container d-flex justify-content-center align-items-center"
        style={{ minWidth: "100vw", minHeight: "85vh" }}
      >
        <Waveform />
      </article>
    </>
  );
}
