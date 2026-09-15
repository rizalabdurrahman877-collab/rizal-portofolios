import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Experience from "@/components/Experience";

export default function Home() {
  return (
   <main className="min-h-screen bg-[#080808] text-white">
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