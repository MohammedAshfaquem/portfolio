import React, { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import ProjectVisual from "./ProjectVisual";
export default function ProjectModal({ modal, onClose }) {
  const close = useRef();
  useEffect(() => {
    if (!modal) return;
    const prev = document.activeElement;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const key = (e) => {
      if (e.key === "Escape") onClose(null);
      if (e.key === "Tab") {
        const els = [...document.querySelectorAll(".modal button,.modal a")];
        const first = els[0],
          last = els.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", key);
      prev?.focus();
    };
  }, [modal, onClose]);
  return modal ? (
    <div className="modal-backdrop" onClick={() => onClose(null)}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          ref={close}
          onClick={() => onClose(null)}
          aria-label="Close case study"
        >
          <X />
        </button>
        <div className="eyebrow">
          {modal.year} / {modal.type}
        </div>
        <h2 id="modal-title">{modal.name}</h2>
        <ProjectVisual project={modal} />
        <h3>The challenge</h3>
        <p>{modal.problem}</p>
        <h3>My contribution</h3>
        <p>{modal.solution}</p>
        <div className="tags">
          {modal.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <p className="case-note">{modal.note}</p>
        {modal.links?.length > 0 && (
          <div className="project-links" aria-label="Project links">
            {modal.links.map((link) => (
              <a
                key={link.href}
                className="text-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label} <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  ) : null;
}
