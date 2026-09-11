export type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  detail: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    number: "01",
    title: "MyApp",
    category: "Web Application",
    description:
      "Aplikasi web modern dengan interface bersih dan responsive untuk berbagai kebutuhan pengguna.",
    detail:
      "MyApp merupakan project aplikasi web dengan fokus pada tampilan sederhana, modern, dan mudah digunakan. Project ini dibuat untuk mengembangkan kemampuan dalam membangun aplikasi web menggunakan teknologi modern.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
    ],
  },

  {
    number: "02",
    title: "Student Management",
    category: "Management System",
    description:
      "Sistem pengelolaan data siswa dengan dashboard sederhana, responsive, dan mudah digunakan.",
    detail:
      "Student Management merupakan aplikasi web yang digunakan untuk mengelola data siswa. Sistem ini dibuat agar proses pengelolaan informasi siswa menjadi lebih terstruktur, mudah dicari, dan mudah digunakan.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
];