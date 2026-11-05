import React, { useRef, useState } from "react";
import { ArrowUpRight, GraduationCap, ChevronDown } from "lucide-react";
import { education } from "../data/education";
import { profile } from "../data/profile";
import "../styles/academic.css";

export default function AcademicBackground() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef([]);
  const record = education[selected];
  const selectWithKeyboard = (event, index) => {
    let next;
    if (["ArrowDown", "ArrowRight"].includes(event.key))
      next = (index + 1) % education.length;
    else if (["ArrowUp", "ArrowLeft"].includes(event.key))
      next = (index - 1 + education.length) % education.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = education.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  };
  return (
    <section
      id="education"
      className="academic-section section"
      aria-labelledby="academic-title"
    >
      <div className="academic-kicker reveal">
        <span className="eyebrow">04 / EDUCATION</span>
        <span>AN ACADEMIC RECORD / 2020 — 2025</span>
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
            <span>EXPLORE THE RECORD</span>
            <span>02 ENTRIES</span>
          </div>
          <div
            className="academic-tabs"
            role="tablist"
            aria-label="Educational qualifications"
            aria-orientation="vertical"
          >
            {education.map((entry, index) => (
              <button
                key={entry.id}
                ref={(element) => {
                  tabs.current[index] = element;
                }}
                id={"academic-tab-" + entry.id}
                type="button"
                role="tab"
                aria-selected={selected === index}
                aria-controls="academic-panel"
                tabIndex={selected === index ? 0 : -1}
                className={
                  "academic-index-record academic-tab" +
                  (selected === index ? " is-selected" : "")
                }
                onClick={() => setSelected(index)}
                onKeyDown={(event) => selectWithKeyboard(event, index)}
              >
                <span className="academic-index-years">
                  <strong>{entry.startYear}</strong>
                  <span>— {entry.endYear}</span>
                </span>
                <span className="academic-tab-copy">
                  <span className="academic-level">{entry.level}</span>
                  <strong>{entry.field}</strong>
                  <span>{entry.institution}</span>
                </span>
                <ArrowUpRight size={21} strokeWidth={1.3} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="academic-index-note">
            SELECT A PERIOD TO VIEW THE QUALIFICATION
          </div>
        </div>
        <div
          className="academic-record"
          id="academic-panel"
          role="tabpanel"
          aria-labelledby={"academic-tab-" + record.id}
          tabIndex={0}
        >
          <div className="academic-record-content" key={record.id}>
            <div className="academic-record-top">
              <span>
                QUALIFICATION / {String(selected + 1).padStart(2, "0")}
              </span>
              <GraduationCap size={20} strokeWidth={1.3} aria-hidden="true" />
            </div>
            <span className="academic-level">{record.level}</span>
            <h3>{record.title}</h3>
            <p className="academic-university">{record.institution}</p>
            <div
              className="academic-study-years"
              aria-label={record.startYear + " to " + record.endYear}
            >
              <span>{record.startYear}</span>
              <span className="academic-year-line" aria-hidden="true">
                <i />
                TO
                <i />
              </span>
              <span>{record.endYear}</span>
            </div>
            <details className="academic-details">
              <summary>
                Qualification details{" "}
                <ChevronDown size={16} aria-hidden="true" />
              </summary>
              <dl>
                <div>
                  <dt>Qualification</dt>
                  <dd>{record.title}</dd>
                </div>
                <div>
                  <dt>{record.institutionType}</dt>
                  <dd>{record.institution}</dd>
                </div>
                <div>
                  <dt>Study period</dt>
                  <dd>
                    {record.startYear} — {record.endYear}
                  </dd>
                </div>
              </dl>
            </details>
            <div className="academic-record-foot">
              <span>{record.field.toUpperCase()}</span>
              <strong aria-hidden="true">{record.abbreviation}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="academic-route reveal">
        <span>THE PROGRESSION</span>
        <div
          className="academic-route-stops"
          role="group"
          aria-label="Browse education by period"
        >
          {[...education].reverse().map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={record.id === entry.id ? "is-selected" : ""}
              aria-pressed={record.id === entry.id}
              onClick={() => setSelected(education.indexOf(entry))}
            >
              <i aria-hidden="true" />
              <span>
                {entry.startYear} — {entry.endYear}
                <strong>{entry.field}</strong>
              </span>
            </button>
          ))}
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
