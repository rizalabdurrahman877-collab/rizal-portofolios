"use client";

import Navbar from "./Navbar";
import Hero from "./Hero";
import TechStack from "./TechStack";
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <Navbar />
      <Hero />
      <TechStack />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}