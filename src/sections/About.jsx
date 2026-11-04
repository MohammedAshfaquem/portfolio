import { profile } from "../data/profile";
import React from "react";
import { ArrowUpRight } from "lucide-react";
export default function About() {
  return (
    <section id="about" className="about section">
      <div className="about-top reveal">
        <div className="eyebrow">02 / THE PERSON BEHIND THE CODE</div>
        <span className="asterisk">✳</span>
      </div>
      <div className="about-grid">
        <div className="about-photo reveal">
          <img
            src={profile.assets.portrait}
            alt="Mohammed Ashfaque wearing an olive shirt and sunglasses"
            loading="lazy"
          />
          <span className="photo-note">
            A LITTLE SUNSHINE,
            <br />A LOT OF CURIOSITY. ↗
          </span>
          <span className="photo-location">KERALA, INDIA / 11° N</span>
        </div>
        <div className="about-content reveal">
          <h2>
            I care about
            <br />
            how it works.
            <br />
            <em>And how it feels.</em>
          </h2>
          <p>
            I’m Ashfaque, a developer from Kerala who enjoys connecting the dots
            between a thoughtful interface and the systems working behind it.
          </p>
          <p>
            My day-to-day work lives in Python: production APIs, booking flows,
            databases, and the small details that make software dependable. With
            React, I bring those systems closer to the people using them.
          </p>
          <a className="text-link" href={profile.assets.resume} download>
            Get to know my experience <ArrowUpRight size={18} />
          </a>
          <div className="education">
            <span>THE FOUNDATION</span>
            <strong>Bachelor of Computer Applications</strong>
            <p>University of Calicut · 2022 — 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
