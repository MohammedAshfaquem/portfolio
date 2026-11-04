import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import ProjectVisual from "../components/projects/ProjectVisual";
export default function Work({ onSelect }) {
  const [filter, setFilter] = useState("All");
  return (
    <section id="work" className="work section">
      <div className="section-heading reveal">
        <div>
          <div className="eyebrow">01 / SELECTED WORK</div>
          <h2>
            Ideas, engineered
            <br />
            <em>into reality.</em>
          </h2>
        </div>
        <p>
          A few things I’ve helped bring to life.
          <br />
          From the first API to the final interaction.
        </p>
      </div>
      <div className="work-toolbar">
        <span>SMALL DETAILS. COMPLETE EXPERIENCES.</span>
        <div className="filters" aria-label="Filter projects">
          {["All", "Full stack", "Backend"].map((f) => (
            <button
              key={f}
              className={f === filter ? "active" : ""}
              onClick={() => setFilter(f)}
              aria-pressed={f === filter}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="project-grid">
        {projects
          .filter(
            (p) =>
              filter === "All" ||
              (filter === "Backend" ? p.id === "01" : p.id !== "01"),
          )
          .map((p) => (
            <button
              className="project"
              key={p.id}
              onClick={() => onSelect(p)}
              aria-label={"Explore " + p.name}
            >
              <ProjectVisual project={p} />
              <div className="project-meta">
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </div>
                <span className="project-arrow">
                  <ArrowUpRight />
                </span>
              </div>
              <div className="tags">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </button>
          ))}
      </div>
    </section>
  );
}
