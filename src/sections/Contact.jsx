import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, Github, Linkedin } from "lucide-react";
import { ContactCompanion } from "../components/companion/Companion";
import { profile } from "../data/profile";
export default function Contact() {
  const { email } = profile;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      location.href = "mailto:" + email;
    }
  };
  return (
    <section id="contact" className="contact section">
      <div className="contact-top">
        <div className="contact-title">
          <div className="eyebrow">
            <span className="status-dot" /> GOOD THINGS START WITH A
            CONVERSATION
          </div>
          <h2>
            Have something
            <br />
            in <em>mind?</em>
            <a href={"mailto:" + email} aria-label="Email Ashfaque">
              <ArrowUpRight />
            </a>
          </h2>
        </div>
        <ContactCompanion />
      </div>
      <div className="contact-bottom">
        <div>
          <p>
            A project, an opportunity, or just a hello.
            <br />
            I’d love to hear from you.
          </p>
          <button className="email-copy" onClick={copy}>
            {email}
            {copied ? <Check size={17} /> : <Copy size={17} />}
            <span aria-live="polite">{copied ? "Copied!" : ""}</span>
          </button>
        </div>
        <div className="socials">
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub <Github size={17} />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <Linkedin size={17} />
          </a>
          <a href={profile.assets.resume} download>
            Download CV <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
