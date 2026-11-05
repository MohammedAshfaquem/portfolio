import React from "react";
import { ArrowUpRight, GraduationCap, ChevronDown } from "lucide-react";
import { education } from "../data/education";
import { profile } from "../data/profile";
import "../styles/academic.css";

export default function AcademicBackground() {
  return (
    <section
      id="education"
      className="academic-section section"
      aria-labelledby="academic-title"
    >
      <div className="academic-kicker reveal">
        <span className="eyebrow">04 / EDUCATION</span>
        <span>
          AN ACADEMIC RECORD / {education.startYear} — {education.endYear}
        </span>
      </div>
      <div className="academic-heading reveal">
        <h2 id="academic-title">
          Academic <em>background.</em>
        </h2>
        <p>
          A foundation in computing.
          <br />
          Applied through building software.
        </p>
      </div>
      <div className="academic-workspace reveal">
        <div className="academic-index">
          <div className="academic-index-label">
            <span>THE QUALIFICATION</span>
            <span>01 ENTRY</span>
          </div>
          <div className="academic-index-record">
            <div className="academic-index-years">
              <strong>{education.startYear}</strong>
              <span>— {education.endYear}</span>
            </div>
            <div>
              <span className="academic-level">{education.level}</span>
              <h3>Computer Applications</h3>
              <p>{education.institution}</p>
            </div>
            <GraduationCap size={25} strokeWidth={1.3} aria-hidden="true" />
          </div>
          <div className="academic-index-note">
            THE FOUNDATION BEHIND THE WORK
          </div>
        </div>
        <article className="academic-record" aria-labelledby="academic-degree">
          <div className="academic-record-top">
            <span>QUALIFICATION / 01</span>
            <GraduationCap size={20} strokeWidth={1.3} aria-hidden="true" />
          </div>
          <span className="academic-level">{education.level}</span>
          <h3 id="academic-degree">{education.title}</h3>
          <p className="academic-university">{education.institution}</p>
          <div
            className="academic-study-years"
            aria-label={education.startYear + " to " + education.endYear}
          >
            <span>{education.startYear}</span>
            <span className="academic-year-line" aria-hidden="true">
              <i />
              TO
              <i />
            </span>
            <span>{education.endYear}</span>
          </div>
          <details className="academic-details">
            <summary>
              Qualification details <ChevronDown size={16} aria-hidden="true" />
            </summary>
            <dl>
              <div>
                <dt>Degree</dt>
                <dd>
                  {education.title} ({education.abbreviation})
                </dd>
              </div>
              <div>
                <dt>University</dt>
                <dd>{education.institution}</dd>
              </div>
              <div>
                <dt>Study period</dt>
                <dd>
                  {education.startYear} — {education.endYear}
                </dd>
              </div>
            </dl>
          </details>
          <div className="academic-record-foot">
            <span>COMPUTER APPLICATIONS</span>
            <strong aria-hidden="true">{education.abbreviation}</strong>
          </div>
        </article>
      </div>
      <div className="academic-route reveal">
        <span>THE FOUNDATION</span>
        <div>
          <i aria-hidden="true" />
          <span>
            {education.startYear} — {education.endYear}
            <strong>
              {education.abbreviation} · {education.institution}
            </strong>
          </span>
        </div>
        <a
          className="text-link"
          href={profile.assets.resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          View full CV <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
