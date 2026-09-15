"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch, Search, X } from "lucide-react";

import ProjectCard from "./ProjectCard";

const projects = [
  {
    number: "01",
    title: "MyApp",
    category: "Web Application",
    image: "/MyApp.png",
    description:
      "Aplikasi web modern yang dibuat untuk memberikan pengalaman pengguna yang cepat, sederhana, dan responsif.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    featured: true,

   
    liveUrl: "https://next-js-v2-red.vercel.app/",
    githubUrl: "https://github.com/username/myapp",
  },

  {
    number: "02",
    title: "Rental Barang",
    category: "Peminjaman Barang",
    image: "/RentalBarang.png",
    description:
      "Sistem management rental barang untuk mengelola data barang secara lebih terstruktur dan mudah digunakan.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    featured: true,

    liveUrl: "https://electronic-rental.vercel.app/",

    githubUrl: "https://github.com/username/rental-barang",
  },
  {
    number: "03",
    title: "Manajemen-Siswa",
    category: "Management System",
    image: "/image.png",
    description:
      "Sistem management siswa untuk mengelola data siswa secara lebih terstruktur dan mudah digunakan.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    featured: false,

    liveUrl: "https://manajemen-siswa-three.vercel.app/auth/login",

    githubUrl: "https://github.com/username/rental-barang",
  },
  {
    number: "04",
    title: "Pendeteksi Banjir",
    category: "Management System",
    image: "/image.png",
    description:
      "Sistem management siswa untuk mengelola data siswa secara lebih terstruktur dan mudah digunakan.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    featured: false,

    liveUrl: "https://wokwi.com/projects/472103988885097473",

    githubUrl: "https://github.com/username/rental-barang",
  },
];

export default function Projects() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] =
    useState<(typeof projects)[number] | null>(null);

  // Filter project berdasarkan search + kategori
  const filteredProjects = projects.filter((project) => {
    const matchSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All"
        ? true
        : filter === "Featured"
        ? project.featured
        : project.category === filter;

    return matchSearch && matchFilter;
  });

  return (
    <section
      id="projects"
      className="relative px-6 py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium text-blue-400">
            02 — Projects
          </span>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Some of my{" "}
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              recent work.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-slate-500">
            Beberapa project yang pernah saya buat selama belajar
            web development dan software engineering.
          </p>
        </motion.div>

        {/* ================= SEARCH ================= */}
        <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Search Input */}
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul project..."
              className="w-full rounded-xl border border-white/10 bg-white/3 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/40 focus:bg-blue-500/3"
            />
          </div>

          {/* ================= FILTER ================= */}
          <div className="flex flex-wrap gap-2">

            {[
              "All",
              "Featured",
              "Web Application",
              "Management System",
            ].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                  filter === category
                    ? "border-blue-400/40 bg-blue-500/15 text-blue-300"
                    : "border-white/10 bg-white/3 text-slate-500 hover:border-blue-400/20 hover:text-slate-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* ================= PROJECT COUNT ================= */}
        <p className="mt-6 text-sm text-slate-600">
          Menampilkan{" "}
          <span className="text-slate-400">
            {filteredProjects.length}
          </span>{" "}
          project
        </p>

        {/* ================= PROJECT GRID ================= */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.number}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectCard
                    project={project}
                    onClick={() =>
                      setSelectedProject(project)
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ================= NO RESULT ================= */
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/3 px-6 py-16 text-center">
            <Search
              size={32}
              className="mx-auto text-slate-700"
            />

            <h3 className="mt-4 text-lg font-medium text-slate-300">
              Project tidak ditemukan
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Coba gunakan kata kunci atau kategori lain.
            </p>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 py-10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#080b14] p-6 shadow-2xl sm:p-8"
            >
              {/* Close */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/3 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>

              {/* Number */}
              <span className="text-sm text-blue-400">
                Project {selectedProject.number}
              </span>

              {/* Title */}
              <h3 className="mt-3 pr-12 text-3xl font-semibold text-white">
                {selectedProject.title}
              </h3>

              {/* Category */}
              <p className="mt-2 text-sm text-slate-500">
                {selectedProject.category}
              </p>

              {/* Image */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-64 w-full object-cover"
                />
              </div>

              {/* Description */}
              <p className="mt-6 leading-7 text-slate-400">
                {selectedProject.description}
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-blue-400/10 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                {/* Live Demo */}
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
                >
                  <ExternalLink
                    size={16}
                    className="mr-2"
                  />
                  Live Demo
                </a>

                {/* Github */}
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/3 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <GitBranch
                    size={16}
                    className="mr-2"
                  />
                  Github
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}