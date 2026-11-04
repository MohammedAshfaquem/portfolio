import { profile } from "../data/profile";
import React, { useRef, useState } from "react";
import { ArrowDown, RotateCcw, RefreshCw, MoveUpRight } from "lucide-react";
import HeroScene from "../components/three/HeroScene";
export default function Hero() {
  const [reset, setReset] = useState(0),
    [flipped, setFlipped] = useState(false),
    [dragging, setDragging] = useState(false);
  const heroRef = useRef();
  return (
    <section
      ref={heroRef}
      className={"hero" + (dragging ? " is-dragging" : "")}
      aria-labelledby="hero-title"
    >
      <div className="hero-scene">
        <HeroScene
          reset={reset}
          flipped={flipped}
          heroRef={heroRef}
          onDrag={setDragging}
        />
      </div>
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" /> A DEVELOPER WITH A HUMAN SIDE
        </div>
        <h1 id="hero-title">
          Thoughtful
          <br />
          interfaces.
          <br />
          <em>Reliable</em>
          <br />
          systems<span className="period">.</span>
        </h1>
        <div className="hero-intro">
          <span className="intro-line" />
          <p>
            Hi, I’m <strong>{profile.name}.</strong>
            <br />A Python & full-stack developer turning
            <br className="desktop" /> complex problems into intuitive
            experiences.
          </p>
        </div>
        <a href="#work" className="round-link">
          <span className="circle">
            <ArrowDown size={19} />
          </span>{" "}
          Explore my work
        </a>
      </div>
      <div className="hero-art">
        <div className="orbit-label">
          A LITTLE PERSONALITY. A LOT OF POSSIBILITY.
        </div>
        <div className="drag-hint">
          <MoveUpRight size={17} />
          <span>Go on, give it a pull.</span>
          <button
            className="card-flip"
            onClick={() => setFlipped((f) => !f)}
            aria-label={flipped ? "Show front of ID card" : "Flip ID card"}
            aria-pressed={flipped}
          >
            <RefreshCw size={14} />
            <span>{flipped ? "Front" : "Flip"}</span>
          </button>
          <button
            onClick={() => {
              setReset((r) => r + 1);
              setFlipped(false);
            }}
            aria-label="Reset hanging ID card"
          >
            <RotateCcw size={14} />
          </button>
        </div>
        <div className="art-coordinate">PERSONAL ID — 001 / IN</div>
      </div>
      <div className="hero-bottom">
        <span>BASED IN KERALA, INDIA</span>
        <span>
          SCROLL TO DISCOVER <ArrowDown size={12} />
        </span>
        <span>CODE WITH CARE. ALWAYS.</span>
      </div>
    </section>
  );
}
