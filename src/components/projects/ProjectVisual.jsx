import React from "react";

export default function ProjectVisual({ project }) {
  return (
    <div className="project-visual project-cover">
      <img
        className="project-cover-image"
        src={project.cover}
        alt={project.coverAlt}
        loading="lazy"
        decoding="async"
        width="1672"
        height="941"
      />
    </div>
  );
}
