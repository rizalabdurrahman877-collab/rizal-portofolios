"use client";

import { FormEvent, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Code2,
  Download,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

const skills = [
  "Figma",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "JavaScript",
  "Supabase",
];

const projects = [
  {
    title: "Management Siswa",
    description:
      "A basic web project developed using Next.js to explore modern web development concepts. This project focuses on building a clean and responsive user interface while implementing fundamental features and components using Next.js and Tailwind CSS.",
    tags: ["HTML", "Tailwind", "CSS"],
    tone: "aurora",
    link: "https://next-js-v2-red.vercel.app/",
    image: "/MyApp.png",
  },
  {
    title: "Rental Barang",
    description:
      "A web-based rental management system developed to manage products, customers, rental transactions, and other rental activities efficiently.",
    tags: ["Next.js", "TypeScript", "Supabase"],
    tone: "simmas",
    link: "https://electronic-rental.vercel.app/",
    image: "/RentalBarang.png",
  },
];

const experience = [
  [
    "Software Engineering Student",
    "SMKN 1 Kota Pasuruan",
    "Studying Software Engineering with a focus on web development, programming fundamentals, database management, and software development. Throughout my studies, I have worked on various school and personal projects while developing my skills in both frontend development and UI/UX design.",
    ["Python", "HTML", "CSS", "MySQL", "JavaScript"],
  ],
  [
    "Web Development & Programming",
    "SMKN 1 & UBIG",
    "Learning and applying web development technologies such as HTML, CSS, JavaScript, Next.js, Tailwind CSS, and TypeScript. Also developing a foundation in Python through basic programming concepts, including variables, conditions, loops, functions, and data structures.",
    ["Next.js", "Tailwind CSS", "TypeScript"],
  ],
  [
    "UI/UX Design Exploration",
    "Personal Projects",
    "Exploring UI/UX design through various personal projects and digital product concepts. Focused on creating clean interfaces, intuitive user flows, responsive layouts, and consistent visual systems while considering usability and user experience.",
    ["Figma"],
  ],
  [
    "Programming & Database Development",
    "School & Personal Projects",
    "Learned programming fundamentals and database management through school assignments and application development projects. Gained experience with basic programming logic, CRUD operations, database relationships, and connecting applications with databases.",
    ["JavaScript", "MySQL", "Supabase", "XAMPP", "Python"],
  ],
  [
    "Creative & Media Experience",
    "School Activities & Organization",
    "Participated in creative and digital media activities involving graphic design, visual communication, content creation, and digital projects. These experiences helped develop creativity, teamwork, communication, and problem-solving skills alongside technical abilities.",
    ["Canva", "Figma"],
  ],
] as const;

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  // ==========================================
  // SEND MESSAGE
  // ==========================================
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    setSent(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to send message."
        );
      }

      alert("Message sent successfully! ✅");

      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);

      alert(
        error instanceof Error
          ? `Failed to send message: ${error.message}`
          : "Failed to send message."
      );
    } finally {
      setSent(false);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <main className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />

      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      {/* ==========================================
          HEADER
      ========================================== */}
      <header className="site-header">
        <a
          className="brand"
          href="#home"
          onClick={closeMenu}
        >
          <span className="brand-mark">
            <Code2 size={18} />
          </span>

          <span>Rizal Abdurrakhman</span>
        </a>

        <button
          className="menu-button"
          aria-label={
            menuOpen ? "Close menu" : "Open menu"
          }
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>

        <nav
          className={`nav-links ${
            menuOpen ? "is-open" : ""
          }`}
        >
          {[
            "Home",
            "About",
            "Projects",
            "Experience",
            "Contact",
          ].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={closeMenu}
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          className="download-link"
          href="/CV-Rizal.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download size={16} />
          Download CV
        </a>
      </header>

      {/* ==========================================
          HERO
      ========================================== */}
      <section className="section hero" id="home">
        <div className="hero-copy reveal-up">
          <p className="eyebrow">
            <span />
            Hello I&apos;m Rizal Abdurrakhman Wakhid
          </p>

          <p className="role-pill">
            Fullstack Developer | Web Developer | Mobile
            Developer
          </p>

          <h1>
            Creating work using
            <br />
            modern website <em>methods.</em>
          </h1>

          <p className="hero-description">
            I designed and built websites using Next.js,
            React, Tailwind CSS, and Supabase.
          </p>

          <div className="hero-actions">
            <a
              className="button button-primary"
              href="#contact"
            >
              Get In Touch
              <ArrowUpRight size={17} />
            </a>

            <a
              className="button button-ghost"
              href="#projects"
            >
              View projects
            </a>
          </div>
        </div>

        <div className="hero-visual reveal-in">
          <div className="portrait-ring">
            <img
              src="/rizal.jpeg"
              alt="Portrait of Rizal Abdurrakhman Wakhid"
            />
          </div>

          <div className="availability">
            <span />
            Available for select projects
          </div>

          <div className="orbit-label">
            From In School
            <br />
            <strong>SMKN 1 PASURUAN ↗</strong>
          </div>
        </div>
      </section>

      {/* ==========================================
          SKILLS TICKER
      ========================================== */}
      <div className="ticker">
        <div className="ticker-track">
          {[...skills, ...skills].map((skill, i) => (
            <span key={`${skill}-${i}`}>
              <i />
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ==========================================
          ABOUT
      ========================================== */}
      <section
        className="section about-grid"
        id="about"
      >
        <div className="section-label">
          <span>01</span>
          <p>About Me</p>
        </div>

        <div className="about-content">
          <h2>
            I build scalable and{" "}
            <span>user-focused web applications</span>
          </h2>

          <div className="about-columns">
            <p>
              I&apos;m a Grade 11 Software Engineering
              (RPL) student at SMKN 1 Kota Pasuruan,
              passionate about building smooth, modern,
              and user-friendly web applications. I enjoy
              turning ideas into functional digital
              experiences while continuously improving my
              development and design skills through school
              and personal projects.
            </p>

            <p>
              I frequently work with HTML, CSS, JavaScript,
              TypeScript, React, Next.js, and Tailwind CSS,
              along with MySQL and basic Python. For design
              and interface development, I often use Figma
              and shadcn/ui to create clean, responsive,
              and consistent experiences.
            </p>
          </div>

          <div className="principles">
            <span>
              <Check size={15} />
              Clean code
            </span>

            <span>
              <Check size={15} />
              Fullstack Apps
            </span>

            <span>
              <Check size={15} />
              Performance
            </span>
          </div>
        </div>
      </section>

      {/* ==========================================
          PROJECTS
      ========================================== */}
      <section
        className="section projects-section"
        id="projects"
      >
        <div className="section-heading">
          <div className="section-label">
            <span>02</span>
            <p>Projects</p>
          </div>

          <h2>
            some of my <span>recent work</span>
          </h2>

          <p className="section-intro">
            A selection of projects showcasing my ability
            to design, build, and scale modern fullstack
            applications.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <article
              className="project-card reveal-card"
              key={project.title}
              style={{
                ["--card-index" as string]: index,
              }}
            >
              <div className="project-art">
                <span className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                />
              </div>

              <div className="project-info">
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live
                    <ExternalLink size={14} />
                  </a>

                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                    <Code2 size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ==========================================
          EXPERIENCE
      ========================================== */}
      <section
        className="section experience-section"
        id="experience"
      >
        <div className="section-label">
          <span>03</span>
          <p>Experience</p>
        </div>

        <div>
          <div className="experience-heading">
            <h2>
              Experience that{" "}
              <span>speaks volume</span>
            </h2>

            <p>
              Exploring my journey as a developer, from
              learning the fundamentals to building
              full-stack applications.
            </p>
          </div>

          <div className="experience-list">
            {experience.map(
              ([title, place, description, tags]) => (
                <article
                  className="experience-item"
                  key={title}
                >
                  <div className="experience-meta">
                    <p>{place}</p>

                    <div className="tags">
                      {tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3>{title}</h3>

                    <p>{description}</p>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          CONTACT
      ========================================== */}
      <section
        className="section contact-section"
        id="contact"
      >
        <div className="contact-grid">
          <div className="contact-card">
            <p className="eyebrow">
              <span />
              Contact
            </p>

            <h2>
              Please provide your comments{" "}
              <em>and suggestions.</em>
            </h2>

            <p>
              Do you have any input? Please fill in the
              details below.
            </p>

            <form onSubmit={submit}>
              {/* NAME */}
              <label>
                Name

                <input
                  required
                  name="name"
                  placeholder="Enter Your Name"
                  autoComplete="name"
                />
              </label>

              {/* EMAIL */}
              <label>
                Email

                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
              </label>

              {/* MESSAGE */}
              <label>
                Message

                <textarea
                  required
                  name="message"
                  placeholder="Tell me about your project"
                  rows={4}
                />
              </label>

              {/* SUBMIT */}
              <button
                className="button button-primary"
                type="submit"
                disabled={sent}
              >
                {sent ? "Sending..." : "Send Message"}

                <ArrowUpRight size={17} />
              </button>
            </form>
          </div>

          {/* ==========================================
              CONTACT INFORMATION
          ========================================== */}
          <aside className="contact-info">
            <h3>Contact Information</h3>

            <div>
              <span>Email</span>

              <a href="mailto:rizalabdurrahman603@gmail.com">
                rizalabdurrahman603@gmail.com
              </a>
            </div>

            <div>
              <span>Phone</span>

              <a href="tel:+6285236390348">
                +62 852 3639 0348
              </a>
            </div>

            <div>
              <span>Location</span>

              <p>Indonesia</p>
            </div>
          </aside>
        </div>
      </section>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer className="site-footer">
        <div>
          <strong>Rizal Abdurrakhman</strong>

          <p>
            Crafting modern, scalable web experiences
            with clean code and thoughtful design.
          </p>
        </div>

        <span>
          © 2026 Rizal Abdurrakhman. All rights reserved
        </span>
      </footer>
    </main>
  );
}