import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-6 flex justify-between items-center h-16">

        <div className="text-2xl font-extrabold text-indigo-600 hover:text-indigo-500 transition duration-300 cursor-pointer">
          RentoPc
        </div>

        <div className="hidden md:flex space-x-8 text-lg">
          <Link href="/" className="hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition duration-300">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-300 transition duration-300">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {!session ? (
            <>
              <Link href={`/login?callbackUrl=${router.asPath}`} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-300">
                Sign In
              </Link>
              <Link href={`/signup?callbackUrl=${router.asPath}`} className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold transition duration-300">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={session.user.image || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-indigo-600 object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <span className="text-gray-400 text-sm">{session.user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-gray-400 focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="mobile-menu bg-gray-800 text-white">
          <Link href="/" className="block px-6 py-3 hover:bg-gray-700 hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="block px-6 py-3 hover:bg-gray-700 hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="block px-6 py-3 hover:bg-gray-700 hover:text-gray-300">
            Contact
          </Link>
          {!session ? (
            <>
              <Link href={`/login?callbackUrl=${router.asPath}`} className="block px-6 py-3 text-indigo-600 hover:bg-indigo-700 hover:text-white">
                Sign In
              </Link>
              <Link href={`/signup?callbackUrl=${router.asPath}`} className="block px-6 py-3 text-gray-400 hover:bg-gray-600 hover:text-white">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full text-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
