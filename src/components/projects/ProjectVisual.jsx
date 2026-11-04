import React from "react";
import { ArrowUpRight } from "lucide-react";
export default function ProjectVisual({ project }) {
  return (
    <div className={"project-visual " + project.color}>
      {project.color === "ticket" ? (
        <>
          <div className="ticket-lines" />
          <div className="event-ticket">
            <span>ADMIT ONE ↗</span>
            <h4>
              MAKE
              <br />
              MEMORIES.
            </h4>
            <div className="ticket-rule" />
            <small>TICKETS2ME — EVENT & CINEMA</small>
            <div className="barcode" />
          </div>
          <div className="ticket-dot">
            t2m<span>®</span>
          </div>
        </>
      ) : project.color === "dine" ? (
        <>
          <div className="dine-word">
            smartdine<span>✳</span>
          </div>
          <div className="order-ui">
            <span>
              TABLE 04 <i>LIVE ORDER</i>
            </span>
            <h4>
              A little taste
              <br />
              of smarter.
            </h4>
            <div className="order-line">
              <span>01</span>
              <b>Your table. Your taste.</b>
              <ArrowUpRight size={17} />
            </div>
            <div className="progress-dots">
              <b />
              <b />
              <b />
              <i />
            </div>
            <small>ORDER → PREPARE → ENJOY</small>
          </div>
        </>
      ) : (
        <>
          <div className="food-word">
            FOOD
            <br />
            <i>RUSH.</i>
          </div>
          <div className="food-sticker">
            FRESH IDEAS.
            <br />
            FULL STACK.
            <ArrowUpRight size={25} />
          </div>
          <div className="food-ring" />
        </>
      )}
      <span className="visual-caption">
        {project.id} / {project.type}
      </span>
    </div>
  );
}
