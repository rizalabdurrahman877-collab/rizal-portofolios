"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { FormEvent, useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      alert("Semua field wajib diisi.");
      return;
    }

    setLoading(true);

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

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal mengirim pesan."
        );
      }

      alert("Pesan berhasil dikirim! 📩");

      form.reset();
    } catch (error) {
      console.error("CONTACT ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Pesan gagal dikirim. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative px-6 py-28 lg:py-36"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[150px]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-blue-400">
            04 — Contact
          </span>

          <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Let's create something{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              together.
            </span>
          </h2>

          <p className="mt-6 max-w-lg leading-8 text-slate-500">
            Punya pertanyaan, ide, atau ingin berdiskusi mengenai
            project? Silakan kirim pesan melalui form.
          </p>

          <div className="mt-10 space-y-6">
            {/* Email */}
            <a
              href="mailto:rizalabdurrahman603@gmail.com"
              className="group flex items-center gap-4"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10">
                <Mail
                  size={18}
                  className="text-cyan-400 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div>
                <p className="text-xs text-slate-600">
                  Email
                </p>

                <p className="mt-1 text-sm text-slate-300 transition-colors duration-300 group-hover:text-cyan-300">
                  rizalabdurrahman603@gmail.com
                </p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                <MapPin
                  size={18}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <p className="text-xs text-slate-600">
                  Location
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  Indonesia
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="rounded-3xl border border-blue-400/10 bg-white/[0.02] p-6 shadow-2xl shadow-blue-500/5 backdrop-blur-xl sm:p-8"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="text-sm text-slate-400"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-400/40 focus:bg-blue-500/[0.03] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div className="mt-5">
            <label
              htmlFor="email"
              className="text-sm text-slate-400"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-400/40 focus:bg-blue-500/[0.03] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Message */}
          <div className="mt-5">
            <label
              htmlFor="message"
              className="text-sm text-slate-400"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={6}
              required
              placeholder="Write your message..."
              disabled={loading}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/10 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-400/40 focus:bg-blue-500/[0.03] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group mt-6 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:translate-y-0"
          >
            <Send
              size={16}
              className={`mr-2 transition-transform duration-300 ${
                loading
                  ? "animate-pulse"
                  : "group-hover:translate-x-1"
              }`}
            />

            {loading ? "Mengirim..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}