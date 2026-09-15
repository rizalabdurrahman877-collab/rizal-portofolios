import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-blue-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
          Page Not Found
        </p>

        <h1 className="text-8xl md:text-9xl font-black">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold mt-4">
          Oops! Page not found.
        </h2>

        <p className="text-gray-400 max-w-md mx-auto mt-4">
          The page you are looking for doesn't exist or may have been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all duration-300 hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}