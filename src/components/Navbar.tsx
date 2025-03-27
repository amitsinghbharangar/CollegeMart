"use client";
import { FaCartPlus, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Avatar } from "./Avatar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SignInModal from "./SignInModal";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-cyan-400 to-blue-300 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo & Mobile Toggle */}
            <div className="flex items-center">
              <img
                src="https://i.postimg.cc/BvXyZQcc/campus-Swaplogo.png"
                alt="CollegeMart Logo"
                width={80}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => router.push("/")}
              />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden ml-4 p-2 text-gray-800 hover:bg-cyan-500 hover:text-white rounded-lg transition-colors duration-200"
              >
                {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>

            {/* Center: Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Nav path="/" label="Home" currentPath={pathname} />
              <Nav path="/contact" label="Contact" currentPath={pathname} />
              <Nav path="/about" label="About" currentPath={pathname} />
              {status === "authenticated" && (
                <Nav path="/chats" label="Chats" currentPath={pathname} />
              )}
            </div>

            {/* Right: Cart & Profile/Sign In */}
            <div className="flex items-center space-x-4">
              {status === "authenticated" && (
                <Link href="/cart">
                  <FaCartPlus className="text-gray-800 text-2xl hover:text-cyan-600 transition-colors duration-200" />
                </Link>
              )}
              {status === "authenticated" ? (
                <Link href="/Profile">
                  <Avatar
                    name={session.user?.name || "User"}
                    size="big"
                    color="coral"
                    className="hover:scale-105 transition-transform duration-200"
                  />
                </Link>
              ) : (
                <button
                  onClick={() => setIsSignInModalOpen(true)}
                  className="bg-orange-400 text-white font-poppins font-medium py-2 px-5 rounded-lg hover:bg-orange-500 hover:shadow-lg transition-all duration-200"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-300 text-gray-800 shadow-md animate-slide-down">
            <ul className="flex flex-col space-y-3 px-4 py-5">
              <Nav
                path="/"
                label="Home"
                currentPath={pathname}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <Nav
                path="/contact"
                label="Contact"
                currentPath={pathname}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <Nav
                path="/about"
                label="About"
                currentPath={pathname}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              {status === "authenticated" && (
                <Nav
                  path="/chats"
                  label="Chats"
                  currentPath={pathname}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              )}
            </ul>
          </div>
        )}
      </nav>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </>
  );
};

interface NavType {
  label: string;
  path: string;
  currentPath: string;
  onClick?: () => void; // Made onClick optional
}

const Nav = ({ label, path, currentPath, onClick }: NavType) => {
  const isActive = currentPath === path;
  return (
    <Link href={path} onClick={onClick}>
      <span
        className={`font-poppins text-lg cursor-pointer px-4 py-2 rounded-lg relative transition-all duration-300 ${
          isActive
            ? "text-white bg-cyan-500"
            : "text-gray-800 hover:text-white hover:bg-cyan-400"
        }`}
      >
        {label}
        {/* Underline Animation */}
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform transition-transform duration-300 ${
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </span>
    </Link>
  );
};

export default Navbar;