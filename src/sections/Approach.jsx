import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { principles } from "../data/principles";
export default function Approach() {
  const [faq, setFaq] = useState(0);
  return (
    <section className="approach section">
      <div>
        <div className="eyebrow">05 / HOW I THINK</div>
        <h2>
          Good software.
          <br />
          <em>By intention.</em>
        </h2>
        <p>Some principles I bring to the work.</p>
      </div>
      <div className="accordions">
        {principles.map((item, i) => (
          <div
            className={"accordion " + (faq === i ? "expanded" : "")}
            key={item.title}
          >
            <button
              onClick={() => setFaq(faq === i ? -1 : i)}
              aria-expanded={faq === i}
              aria-controls={"answer-" + i}
            >
              <span>0{i + 1}</span>
              {item.title}
              {faq === i ? <Minus size={18} /> : <Plus size={18} />}
            </button>
            <div id={"answer-" + i} hidden={faq !== i}>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
