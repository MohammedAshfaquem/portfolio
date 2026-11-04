import React from "react";
import { experience } from "../data/experience";
export default function Experience() {
  return (
    <section id="experience" className="experience section">
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">03 / ALONG THE WAY</div>
          <h2>
            Learning by
            <br />
            <em>building.</em>
          </h2>
        </div>
        <p>
          Real teams. Real problems.
          <br />A little better with every iteration.
        </p>
      </div>
      {experience.map((j, i) => (
        <article className="job reveal" key={j.co}>
          <span className="job-no">0{i + 1}</span>
          <div>
            <h3>{j.role}</h3>
            <h4>{j.co}</h4>
            <p>{j.text}</p>
            <small>{j.tags}</small>
          </div>
          <span className="job-date">{j.date}</span>
        </article>
      ))}
    </section>
  );
}
