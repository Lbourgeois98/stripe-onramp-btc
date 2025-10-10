import Navbar from "../components/Navbar";

export default function Rules() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-cyan-800 text-white">
      <Navbar />
      <div className="pt-24 max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Game Rules</h1>
        <ul className="space-y-4 text-lg">
          <li>🎯 Each spin or round follows fair play principles.</li>
          <li>💎 Winnings are credited directly to your account.</li>
          <li>⚓ Please gamble responsibly — fun first!</li>
        </ul>
      </div>
    </div>
  );
}
