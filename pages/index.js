import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: "url('/images/sirenlogo.jpeg')" }}
    >
      <Navbar />
      <div className="text-center mt-24 bg-black/60 p-10 rounded-2xl max-w-lg">
        <h1 className="text-5xl font-bold mb-4">Welcome to Sirens Fortune</h1>
        <p className="text-lg">
          Dive beneath the waves and uncover treasures hidden in the depths.
        </p>
      </div>
    </div>
  );
}
