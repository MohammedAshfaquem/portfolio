import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../sections/Hero";
import Toolkit from "../sections/Toolkit";
import Work from "../sections/Work";
import About from "../sections/About";
import Experience from "../sections/Experience";
import AcademicBackground from "../sections/AcademicBackground";
import Approach from "../sections/Approach";
import Contact from "../sections/Contact";
import InteractiveCursor from "../components/effects/InteractiveCursor";
import PortfolioCompanion from "../components/companion/Companion";
import ProjectModal from "../components/projects/ProjectModal";
import useScrollReveal from "../hooks/useScrollReveal";
export default function App() {
  const [modal, setModal] = useState(null);
  useScrollReveal();
  return (
    <>
      <InteractiveCursor />
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Header />
      <main>
        <Hero />
        <Toolkit />
        <Work onSelect={setModal} />
        <About />
        <Experience />
        <AcademicBackground />
        <Approach />
        <Contact />
      </main>
      <Footer />
      <PortfolioCompanion suppressed={!!modal} />
      <ProjectModal modal={modal} onClose={setModal} />
    </>
  );
}
