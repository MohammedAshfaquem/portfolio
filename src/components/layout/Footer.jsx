import BrandMark from "../icons/BrandMark";
import { profile } from "../../data/profile";
import React from "react";
export default function Footer() {
  return (
    <footer>
      <a className="brand" href="#">
        {profile.brand}
        <span>
          <BrandMark />
        </span>
      </a>
      <span>
        © {/* @__PURE__ */ new Date().getFullYear()} MOHAMMED ASHFAQUE
      </span>
      <span>BUILT WITH CURIOSITY & REACT.</span>
      <a href="#">BACK TO TOP ↑</a>
    </footer>
  );
}
