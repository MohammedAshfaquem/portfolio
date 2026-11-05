import BrandMark from "../icons/BrandMark";
import { projects } from "../../data/projects";
import { profile } from "../../data/profile";
import React, { useState } from "react";
import { ArrowUpRight, X, Plus } from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle";
export default function Header() {
  const [menu, setMenu] = useState(false);
  return (
    <header>
      <a className="brand" href="#" aria-label="Ashfaque home">
        {profile.brand}
        <span>
          <BrandMark />
        </span>
      </a>
      <nav className={menu ? "open" : ""} aria-label="Main navigation">
        <a href="#work" onClick={() => setMenu(false)}>
          Selected work <span>{String(projects.length).padStart(2, "0")}</span>
        </a>
        <a href="#about" onClick={() => setMenu(false)}>
          A little about me
        </a>
        <a
          href="#contact"
          className="nav-contact"
          onClick={() => setMenu(false)}
        >
          Let’s talk <ArrowUpRight size={16} />
        </a>
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <button
          className="menu-toggle"
          onClick={() => setMenu(!menu)}
          aria-label="Toggle navigation"
          aria-expanded={menu}
        >
          {menu ? <X /> : <Plus />}
        </button>
      </div>
    </header>
  );
}
