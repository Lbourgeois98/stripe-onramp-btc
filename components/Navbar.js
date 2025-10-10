import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDeposit = async () => {
    try {
      const res = await fetch("/api/deposit");
      if (res.redirected) window.location.href = res.url;
      else alert("Failed to create deposit session");
    } catch (err) {
      console.error(err);
      alert("Error connecting to deposit service");
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black/60 text-white fixed w-full z-50 backdrop-blur-lg">
      <Link href="/" className="flex items-center gap-2">
        <img src="/images/sirenlogo.jpeg" alt="Sirens Fortune" className="h-10 w-10 rounded-full" />
        <span className="font-bold text-2xl tracking-wide">Sirens Fortune</span>
      </Link>

      <div className="hidden md:flex gap-8 text-lg">
        <Link href="/games" className="hover:text-cyan-300">Games</Link>
        <Link href="/rules" className="hover:text-cyan-300">Rules</Link>
        <Link href="/contact" className="hover:text-cyan-300">Contact</Link>
      </div>

      <button
        onClick={handleDeposit}
        className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full font-semibold hover:opacity-90 transition"
      >
        Deposit
      </button>

      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/90 flex flex-col items-center py-4 gap-4">
          <Link href="/games" className="hover:text-cyan-300" onClick={() => setMenuOpen(false)}>Games</Link>
          <Link href="/rules" className="hover:text-cyan-300" onClick={() => setMenuOpen(false)}>Rules</Link>
          <Link href="/contact" className="hover:text-cyan-300" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}
