import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 text-white">
      <Navbar />
      <div className="pt-24 text-center">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <p className="mb-6">Reach out to the Sirens through Facebook</p>

        <div className="flex flex-col items-center gap-4">
          <a
            href="https://facebook.com/YourPageHere"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Visit Facebook Page
          </a>
          <a
            href="https://m.me/YourPageHere"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            Message on Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
