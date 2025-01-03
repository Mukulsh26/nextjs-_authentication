import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex justify-center">
      <div className="w-full max-w-6xl px-4 py-8">
        {/* Content Wrapper */}
        <div className="bg-gray-900 shadow-lg rounded-lg p-8 text-white">
          {children}
        </div>
      </div>
    </div>
    </>
  );
}
