import Navbar from "../components/Navbar";

export default function Games() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white">
      <Navbar />
      <div className="pt-24 text-center">
        <h1 className="text-4xl font-bold mb-6">Games</h1>
        <p className="max-w-2xl mx-auto">
          Explore thrilling underwater adventures — slots, strategy, and treasure hunts!
        </p>
      </div>
    </div>
  );
}
