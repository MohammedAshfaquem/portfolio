import BrandMark from "../components/icons/BrandMark";
import React from "react";
export default function Toolkit() {
  return (
    <div id="toolkit" className="stack-strip">
      <span>MY EVERYDAY TOOLKIT</span>
      <div>
        Python{" "}
        <i>
          <BrandMark />
        </i>{" "}
        FastAPI{" "}
        <i>
          <BrandMark />
        </i>{" "}
        Django{" "}
        <i>
          <BrandMark />
        </i>{" "}
        React{" "}
        <i>
          <BrandMark />
        </i>{" "}
        PostgreSQL{" "}
        <i>
          <BrandMark />
        </i>{" "}
        Docker{" "}
        <i>
          <BrandMark />
        </i>{" "}
        LLMs
      </div>
    </div>
  );
}
