import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import "../../styles/atmosphere.css";
export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "light",
  );
  const changing = useRef(false);
  useEffect(() => {
    const system = matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      try {
        if (localStorage.getItem("ashfaque-theme")) return;
      } catch {}
      const next = system.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    system.addEventListener("change", update);
    return () => system.removeEventListener("change", update);
  }, []);
  const toggle = async (event) => {
    if (changing.current) return;
    const next = theme === "dark" ? "light" : "dark";
    const rect = event.currentTarget.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty("--theme-x", `${rect.left + rect.width / 2}px`);
    root.style.setProperty("--theme-y", `${rect.top + rect.height / 2}px`);
    const apply = () => {
      flushSync(() => setTheme(next));
      root.dataset.theme = next;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", next === "dark" ? "#171b17" : "#eeeee7");
      try {
        localStorage.setItem("ashfaque-theme", next);
      } catch {}
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    if (!document.startViewTransition) {
      root.classList.add("theme-fading");
      apply();
      setTimeout(() => root.classList.remove("theme-fading"), 650);
      return;
    }
    changing.current = true;
    try {
      await document.startViewTransition(apply).finished;
    } catch {
    } finally {
      changing.current = false;
    }
  };
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <span className="theme-icon" key={theme}>
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </span>
    </button>
  );
}
