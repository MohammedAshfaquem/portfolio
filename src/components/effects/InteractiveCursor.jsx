import React, { useEffect, useRef } from "react";
import "../../styles/atmosphere.css";
export default function InteractiveCursor() {
  const ring = useRef(),
    dot = useRef(),
    label = useRef();
  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)"),
      reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      visible = false,
      x = 0,
      y = 0,
      rx = 0,
      ry = 0;
    const root = document.documentElement;
    const hide = () => {
      visible = false;
      root.classList.remove("cursor-active");
    };
    const mode = (target) => {
      const element = target instanceof Element ? target : null;
      let state = "default",
        text = "";
      if (element?.closest(".project")) {
        state = "view";
        text = "VIEW";
      } else if (
        element?.closest(".hero") &&
        ["grab", "grabbing"].includes(document.body.style.cursor)
      ) {
        state = "drag";
        text = "DRAG";
      } else if (element?.closest('a,button,[role="button"]')) {
        state = "link";
        text = "↗";
      }
      if (ring.current) {
        ring.current.dataset.mode = state;
        label.current.textContent = text;
      }
    };
    const animate = () => {
      if (!visible) {
        frame = 0;
        return;
      }
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      frame = requestAnimationFrame(animate);
    };
    const move = (e) => {
      if (!fine.matches || reduced.matches || e.pointerType === "touch") {
        hide();
        return;
      }
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        rx = x;
        ry = y;
        visible = true;
        root.classList.add("cursor-active");
      }
      mode(e.target);
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const press = () => ring.current?.classList.add("is-pressed");
    const release = () => ring.current?.classList.remove("is-pressed");
    const key = (e) => {
      if (e.key === "Tab") hide();
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", press);
    document.addEventListener("pointerup", release);
    document.addEventListener("pointercancel", release);
    document.addEventListener("pointerleave", hide);
    document.addEventListener("keydown", key);
    window.addEventListener("blur", hide);
    fine.addEventListener("change", hide);
    reduced.addEventListener("change", hide);
    return () => {
      cancelAnimationFrame(frame);
      hide();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("pointercancel", release);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("keydown", key);
      window.removeEventListener("blur", hide);
      fine.removeEventListener("change", hide);
      reduced.removeEventListener("change", hide);
    };
  }, []);
  return (
    <div className="cursor-system" aria-hidden="true">
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-follower" data-mode="default">
        <span className="cursor-shape">
          <span ref={label} />
        </span>
      </div>
    </div>
  );
}
