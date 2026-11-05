import React from "react";
import { ArrowDownToLine, ChevronDown } from "lucide-react";
import { experience } from "../data/experience";
import { profile } from "../data/profile";
import "../styles/experience.css";

export default function Experience() {
  return (
    <section
      id="experience"
      className="experience section"
      aria-labelledby="experience-title"
    >
      <div className="career-kicker reveal">
        <span className="eyebrow">03 / EXPERIENCE</span>
        <span>LEARNING. BUILDING. CONTRIBUTING.</span>
      </div>
      <div className="career-layout">
        <div className="career-intro reveal">
          <h2 id="experience-title">
            Professional
            <br />
            <em>experience.</em>
          </h2>
          <p>
            From full-stack development at BridgeOn to production backend
            engineering at MITE Technology, each step has shaped how I build
            reliable software.
          </p>
          <a
            className="text-link career-resume"
            href={profile.assets.resume}
            download
          >
            Download my résumé <ArrowDownToLine size={16} aria-hidden="true" />
          </a>
          <div className="career-footnote">
            <span>MY JOURNEY</span>
            <p>
              Hands-on learning.
              <br />
              Real product experience.
            </p>
          </div>
        </div>
        <div className="career-companies">
          {experience.map((job) => (
            <article
              className="career-company reveal"
              key={job.id}
              aria-labelledby={job.id + "-company"}
            >
              <div className="career-company-head">
                <div className={"career-logo career-logo-" + job.id}>
                  <img
                    src={job.logo}
                    alt=""
                    width="72"
                    height="72"
                    loading="lazy"
                  />
                </div>
                <div className="career-identity">
                  <h3 id={job.id + "-company"}>{job.co}</h3>
                  <span>
                    {job.current ? "PROFESSIONAL WORK" : "INTERNSHIP"}
                  </span>
                </div>
              </div>
              <div
                className={"career-role" + (job.current ? " is-current" : "")}
              >
                <div className="career-role-meta">
                  <span>{job.date}</span>
                  {job.current && (
                    <span className="career-current">
                      <i aria-hidden="true" />
                      CURRENT ROLE
                    </span>
                  )}
                </div>
                <h4>{job.role}</h4>
                <p className="career-summary">{job.text}</p>
                <details className="career-details" open={job.current}>
                  <summary>
                    Contribution highlights{" "}
                    <ChevronDown size={16} aria-hidden="true" />
                  </summary>
                  <ul>
                    {job.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>
                <div className="career-focus" aria-label="Technologies used">
                  {job.focus.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
