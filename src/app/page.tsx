import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center max-w-3xl px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          Build a Resume That Gets Read.
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Create a professional, ATS-friendly resume in minutes.
        </p>
        <Link
          href="/builder"
          className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Start Building
        </Link>
      </div>
    </div>
  );
}
